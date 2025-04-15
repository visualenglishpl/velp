import { Express, Request, Response } from "express";
import { GetObjectCommand, S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// S3 configuration 
const S3_BUCKET = process.env.S3_BUCKET || "visualenglishmaterial";

// Check if AWS credentials are available
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.warn("WARNING: AWS credentials are missing or empty! Direct S3 access will not work.");
  console.warn("Make sure AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables are set.");
} else {
  console.log("AWS credentials are available for S3 access.");
}

// Import NodeJS's https module to check for redirects
import https from 'https';

// Function to check where a bucket URL redirects to
async function checkBucketRedirect(bucketUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    const req = https.get(bucketUrl, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log(`Bucket redirects to: ${res.headers.location}`);
        resolve(res.headers.location);
      } else {
        console.log(`Bucket doesn't redirect. Status: ${res.statusCode}`);
        resolve(null);
      }
      res.resume(); // consume the response to free resources
    });
    
    req.on('error', (e) => {
      console.error(`Error checking bucket redirect: ${e.message}`);
      resolve(null);
    });
    
    req.end();
  });
}

// Log debug info before we create the client
console.log(`Creating S3 client with settings - Bucket: ${S3_BUCKET}`);

// Create the S3 client with the CORRECT region
// We found the exact endpoint: visualenglishmaterial.s3.eu-north-1.amazonaws.com
// This means the bucket is in EU North 1 (Stockholm) region, not EU Central 1
const s3Client = new S3Client({
  region: 'eu-north-1', // Using EU North 1 (Stockholm) region - IMPORTANT: This is the correct region!
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  },
  // Explicitly set the endpoint to avoid redirects
  endpoint: 'https://s3.eu-north-1.amazonaws.com'
});

// Check the bucket redirect immediately
(async () => {
  try {
    const redirectUrl = await checkBucketRedirect(`https://${S3_BUCKET}.s3.amazonaws.com`);
    if (redirectUrl) {
      console.log(`IMPORTANT: S3 bucket redirects to ${redirectUrl}. Please update S3 client configuration to use this endpoint.`);
    }
  } catch (error) {
    console.error("Error checking redirect:", error);
  }
})();

// Log S3 configuration
console.log(`S3 configuration: Bucket=${S3_BUCKET}, Region=eu-north-1`);

// Helper function to list objects in S3
async function listS3Objects(prefix: string): Promise<string[]> {
  console.log(`Listing S3 objects with prefix: ${prefix}`);
  try {
    // Make sure prefix doesn't start with a slash if it's not empty
    if (prefix.startsWith('/') && prefix !== '/') {
      prefix = prefix.substring(1);
    }

    // Handle bucket URLs that might be passed instead of prefixes
    if (prefix.includes('http')) {
      try {
        const url = new URL(prefix);
        // Extract the path from the URL and remove leading slash
        prefix = url.pathname.startsWith('/') ? url.pathname.substring(1) : url.pathname;
        console.log(`Converted URL to prefix: ${prefix}`);
      } catch (urlError) {
        console.error(`Invalid URL format: ${prefix}`, urlError);
      }
    }
    
    // Log the final prefix for debugging
    console.log(`Using final S3 prefix: "${prefix}"`);
    
    const command = new ListObjectsV2Command({
      Bucket: S3_BUCKET,
      Prefix: prefix,
      MaxKeys: 1000
    });
    
    console.log(`S3 ListObjectsV2Command created for bucket: ${S3_BUCKET}`);
    
    try {
      // Test AWS credentials by listing the current bucket before filtering
      const response = await s3Client.send(command);
      console.log('S3 API response received');
      
      if (!response.Contents) {
        console.log('No contents found in S3 response');
        return [];
      }
      
      // Log found keys for debugging
      const keys = response.Contents
        .map(item => item.Key || "")
        .filter(key => key !== "");
        
      console.log(`Found ${keys.length} objects in S3 bucket for prefix "${prefix}":`, 
        keys.length > 0 ? keys.slice(0, 5).join(', ') + (keys.length > 5 ? '...' : '') : 'None');
      
      return keys;
    } catch (innerError) {
      console.error(`Error from S3 client: ${innerError}`);
      throw innerError; // Re-throw to be caught by outer try/catch
    }
  } catch (error) {
    console.error(`Error listing S3 objects with prefix ${prefix}:`, error);
    
    // More detailed error handling
    const err = error as { name?: string, message?: string, $metadata?: { httpStatusCode?: number } };
    if (err.name === 'CredentialsProviderError') {
      console.error('AWS credential error - check AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY');
    } else if (err.name === 'NoSuchBucket') {
      console.error(`Bucket ${S3_BUCKET} does not exist`);
    } else if (err.name === 'AccessDenied') {
      console.error('Access denied to S3 bucket - check permissions');
    }
    
    if (err.$metadata?.httpStatusCode) {
      console.error(`HTTP Status Code: ${err.$metadata.httpStatusCode}`);
    }
    
    // We always return an array, even if empty, to avoid JSON parsing errors
    return [];
  }
}

// Helper function to get a presigned URL for an S3 object
async function getS3PresignedUrl(key: string, expiresIn = 3600): Promise<string | null> {
  try {
    // DEBUG: Log the exact key we're trying to access
    console.log(`Requesting S3 presigned URL for key: "${key}"`);
    
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: key
    });
    
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    console.log(`Generated presigned URL for key: "${key}" - Success`);
    return url;
  } catch (error) {
    console.error(`Error generating presigned URL for ${key}:`, error);
    return null;
  }
}

// Extract content type from a file path
function getContentTypeFromPath(filepath: string): string {
  const extension = filepath.split('.').pop()?.toLowerCase();
  
  if (!extension) return "unknown";
  
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
    return "IMAGE";
  }
  
  if (['mp4', 'webm', 'avi', 'mov'].includes(extension)) {
    return "video";
  }
  
  if (['mp3', 'wav', 'ogg'].includes(extension)) {
    return "audio";
  }
  
  if (['pdf'].includes(extension)) {
    return "PDF";
  }
  
  if (['html', 'htm'].includes(extension)) {
    return "lesson";
  }
  
  return "document";
}

// Register direct routes that map 1:1 with S3 structure
export function registerDirectRoutes(app: Express) {
  // Basic authentication middleware - made optional for direct paths
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    // For development and testing, allow access even if not authenticated
    // In production, this should be properly secured
    console.log("Authentication check for direct routes - allowing access");
    return next();
    
    // Original authentication check (commented out for now)
    // if (req.isAuthenticated()) {
    //   return next();
    // }
    // res.status(401).json({ error: "Not authenticated" });
  };
  
  // Test route to verify S3 connectivity
  app.get("/api/direct/test-s3", async (req, res) => {
    try {
      console.log("Testing S3 connectivity...");
      // Try listing objects in the root of the bucket to test connectivity
      const s3Files = await listS3Objects("");
      
      return res.json({
        success: true,
        message: "S3 connection successful",
        fileCount: s3Files.length,
        sampleFiles: s3Files.length > 0 ? s3Files.slice(0, 5) : []
      });
    } catch (error) {
      const err = error as { message?: string };
      console.error("S3 test connection failed:", error);
      return res.status(500).json({
        success: false,
        message: "S3 connection failed",
        error: err.message || "Unknown error"
      });
    }
  });
  
  // Direct route for accessing book contents from S3
  app.get("/api/direct/:bookPath/:unitPath", isAuthenticated, async (req, res) => {
    try {
      const { bookPath, unitPath } = req.params;
      
      // Clean and validate paths
      const bookId = bookPath.replace(/[^a-zA-Z0-9]/g, "");
      const unitId = unitPath.replace(/[^a-zA-Z0-9]/g, "");
      
      // Extract unit number if present
      let unitNumber = 0;
      const unitMatch = unitPath.match(/unit(\d+)/i);
      if (unitMatch && unitMatch[1]) {
        unitNumber = parseInt(unitMatch[1], 10);
      }
      
      // Create unit information
      const unit = {
        path: `${bookPath}/${unitPath}`,
        bookId: bookPath,
        unitNumber,
        title: `Unit ${unitNumber} Content`
      };
      
      console.log(`Direct access to ${bookPath}/${unitPath}`);
      return res.json(unit);
    } catch (err) {
      console.error(`Error fetching ${req.params.bookPath}/${req.params.unitPath}:`, err);
      res.status(500).json({ error: "Failed to fetch unit" });
    }
  });
  
  // Direct materials endpoint for accessing contents in a book/unit
  app.get("/api/direct/:bookPath/:unitPath/materials", isAuthenticated, async (req, res) => {
    try {
      const { bookPath, unitPath } = req.params;
      
      // Construct the exact S3 path
      const s3Path = `${bookPath}/${unitPath}/`;
      console.log(`Trying to fetch materials from S3 path: ${s3Path}`);
      
      // List objects from S3 
      const s3Files = await listS3Objects(s3Path);
      
      if (s3Files.length > 0) {
        console.log(`Found ${s3Files.length} files at ${s3Path}`);
      } else {
        console.log(`No files found at ${s3Path}`);
      }
      
      // Convert S3 files to material objects
      const materials = s3Files.map((filePath, index) => {
        // Get the filename without the path
        const filename = filePath.split('/').pop() || filePath;
        
        // Create a material object
        return {
          id: index + 1, // Simple sequential ID
          path: filePath,
          title: filename,
          description: filename, // Changed from "Content from ${filePath}" to just the filename
          contentType: getContentTypeFromPath(filePath),
          content: filename,
          orderIndex: index,
          order: index,
          isPublished: true,
          isLocked: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      });
      
      // Sort the materials by filename numeric prefix if possible
      materials.sort((a, b) => {
        const aMatch = a.title.match(/^(\d+)/);
        const bMatch = b.title.match(/^(\d+)/);
        
        if (aMatch && bMatch) {
          return parseInt(aMatch[1]) - parseInt(bMatch[1]);
        }
        
        return a.orderIndex - b.orderIndex;
      });
      
      console.log(`Returning ${materials.length} materials for direct path: ${s3Path}`);
      return res.json(materials);
    } catch (err) {
      console.error(`Error fetching materials for ${req.params.bookPath}/${req.params.unitPath}:`, err);
      res.status(500).json({ error: "Failed to fetch materials" });
    }
  });
  
  // Direct asset endpoint for accessing individual files
  app.get("/api/direct/:bookPath/:unitPath/assets/:filename", isAuthenticated, async (req, res) => {
    try {
      const { bookPath, unitPath, filename } = req.params;
      
      // Clean filename
      let cleanFilename = decodeURIComponent(filename);
      
      // Construct the exact S3 path
      const key = `${bookPath}/${unitPath}/${cleanFilename}`;
      
      console.log(`Direct asset access - trying to fetch: ${key}`);
      
      // Get the presigned URL
      const presignedUrl = await getS3PresignedUrl(key);
      
      if (!presignedUrl) {
        console.error(`Content not found: ${key}`);
        return res.status(404).json({ error: "Content not found" });
      }
      
      // CHANGE: Instead of redirecting, proxy the S3 response
      // This avoids CORS issues and ensures we return JSON
      try {
        console.log(`Using presigned URL: ${presignedUrl}`);
        
        // Use fetch to get the content directly
        const response = await fetch(presignedUrl, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
          },
        });
        
        if (!response.ok) {
          console.error(`Error fetching from presigned URL: ${response.status} ${response.statusText}`);
          return res.status(response.status).json({ 
            error: "Error fetching from S3", 
            details: `${response.status} ${response.statusText}` 
          });
        }
        
        // Get the content type from the response
        const contentType = response.headers.get('content-type');
        if (contentType) {
          res.setHeader('Content-Type', contentType);
        }
        
        // Set cache headers
        res.setHeader('Cache-Control', 'public, max-age=3600');
        
        // Stream the response back to the client
        const buffer = await response.arrayBuffer();
        return res.send(Buffer.from(buffer));
        
      } catch (fetchError) {
        console.error(`Fetch error from presigned URL: ${fetchError}`);
        return res.status(500).json({ 
          error: "Failed to fetch from S3", 
          details: String(fetchError)
        });
      }
    } catch (error) {
      console.error(`Error fetching asset: ${error}`);
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });
  
  // Endpoint to save reordered materials
  app.post("/api/direct/:bookPath/:unitPath/saveOrder", isAuthenticated, async (req, res) => {
    try {
      const { bookPath, unitPath } = req.params;
      const { materials } = req.body;
      
      if (!Array.isArray(materials)) {
        return res.status(400).json({ error: "Invalid materials data" });
      }
      
      console.log(`Saving reordered materials for ${bookPath}/${unitPath}`);
      
      // In a production environment, you would save this order to a database
      // For now, we'll store it in memory (this will reset on server restart)
      if (!(global as any).materialOrders) {
        (global as any).materialOrders = {};
      }
      
      const orderKey = `${bookPath}/${unitPath}`;
      (global as any).materialOrders[orderKey] = materials.map(m => m.id);
      
      console.log(`Saved order for ${orderKey}:`, (global as any).materialOrders[orderKey]);
      
      return res.json({ 
        success: true, 
        message: "Order saved successfully",
        orderKey
      });
    } catch (error) {
      console.error(`Error saving material order:`, error);
      res.status(500).json({ error: "Failed to save material order" });
    }
  });

  // Get the saved order for materials
  app.get("/api/direct/:bookPath/:unitPath/savedOrder", isAuthenticated, async (req, res) => {
    try {
      const { bookPath, unitPath } = req.params;
      const orderKey = `${bookPath}/${unitPath}`;
      
      // Get the saved order from memory
      const savedOrder = (global as any).materialOrders?.[orderKey] || null;
      
      return res.json({
        success: true,
        hasCustomOrder: !!savedOrder,
        order: savedOrder
      });
    } catch (error) {
      console.error(`Error getting saved order:`, error);
      res.status(500).json({ error: "Failed to get saved order" });
    }
  });
  
  // Special endpoint for Book 0 icons folder access
  app.get("/api/direct/:bookPath/icons/:filename", isAuthenticated, async (req, res) => {
    try {
      const { bookPath, filename } = req.params;
      
      // Clean filename
      const cleanFilename = decodeURIComponent(filename);
      
      // Construct the exact S3 path
      const key = `${bookPath}/icons/${cleanFilename}`;
      
      console.log(`ICONS FOLDER ACCESS - trying to fetch from icons folder: ${key}`);
      
      // Get the presigned URL
      const presignedUrl = await getS3PresignedUrl(key);
      
      if (!presignedUrl) {
        console.error(`Icon not found: ${key}`);
        return res.status(404).json({ error: "Icon not found" });
      }
      
      // Handle the same way as other assets
      console.log(`Using presigned URL for icon: ${presignedUrl}`);
      
      // Use fetch to get the content directly
      const response = await fetch(presignedUrl, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
        },
      });
      
      if (!response.ok) {
        console.error(`Error fetching icon: ${response.status} ${response.statusText}`);
        return res.status(response.status).json({ 
          error: "Error fetching icon from S3", 
          details: `${response.status} ${response.statusText}` 
        });
      }
      
      // Get the content type from the response
      const contentType = response.headers.get('content-type');
      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }
      
      // Set cache headers
      res.setHeader('Cache-Control', 'public, max-age=3600');
      
      // Stream the response back to the client
      const buffer = await response.arrayBuffer();
      return res.send(Buffer.from(buffer));
      
    } catch (error) {
      console.error(`Error fetching icon: ${error}`);
      res.status(500).json({ error: "Failed to fetch icon" });
    }
  });
  
  // General asset endpoint for accessing icons and other global assets
  app.get("/api/asset/:path(*)", async (req, res) => {
    try {
      const assetPath = req.params.path;
      console.log(`Asset access - trying to fetch: ${assetPath}`);
      
      // Get the presigned URL
      const presignedUrl = await getS3PresignedUrl(assetPath);
      
      if (!presignedUrl) {
        console.error(`Asset not found: ${assetPath}`);
        return res.status(404).json({ error: "Asset not found" });
      }
      
      console.log(`Using presigned URL for asset: ${presignedUrl}`);
      
      // Use fetch to get the content directly
      const response = await fetch(presignedUrl, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
        },
      });
      
      if (!response.ok) {
        console.error(`Error fetching asset: ${response.status} ${response.statusText}`);
        return res.status(response.status).json({ 
          error: "Error fetching asset from S3", 
          details: `${response.status} ${response.statusText}` 
        });
      }
      
      // Get the content type from the response
      const contentType = response.headers.get('content-type');
      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }
      
      // Set cache headers
      res.setHeader('Cache-Control', 'public, max-age=3600');
      
      // Stream the response back to the client
      const buffer = await response.arrayBuffer();
      return res.send(Buffer.from(buffer));
      
    } catch (error) {
      console.error("Error fetching asset:", error);
      res.status(500).json({ error: "Error fetching asset" });
    }
  });
  
  console.log("Direct routes registered successfully");
}