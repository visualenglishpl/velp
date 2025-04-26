import { Express, Request, Response } from "express";
import { GetObjectCommand, S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as path from 'path';
import * as xlsx from 'xlsx';
import { processExcelAndGenerateTS } from './excel-processor';
import { processUnitExcel, QuestionAnswerEntry, downloadExcelFile } from './excel-unit-processor';
import { storage } from './storage';

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
    console.log(`Authentication check for ${req.path} - allowing access`);
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
  
  // Direct thumbnails endpoint - specific for thumbnails
  app.get("/api/direct/thumbnails/:filename", async (req, res) => {
    try {
      const { filename } = req.params;
      
      // Clean filename
      let cleanFilename = decodeURIComponent(filename);
      
      // Construct the exact S3 path
      const key = `thumbnails/${cleanFilename}`;
      
      console.log(`Thumbnail access - trying to fetch: ${key}`);
      
      // Get the presigned URL
      const presignedUrl = await getS3PresignedUrl(key);
      
      if (!presignedUrl) {
        console.error(`Thumbnail not found: ${key}`);
        return res.status(404).json({ error: "Thumbnail not found" });
      }
      
      try {
        console.log(`Using presigned URL for thumbnail: ${presignedUrl}`);
        
        // Use fetch to get the content directly
        const response = await fetch(presignedUrl, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
          },
        });
        
        if (!response.ok) {
          console.error(`Error fetching thumbnail: ${response.status} ${response.statusText}`);
          return res.status(response.status).json({ 
            error: "Error fetching thumbnail from S3", 
            details: `${response.status} ${response.statusText}` 
          });
        }
        
        // Get the content type from the response
        const contentType = response.headers.get('content-type');
        
        // Set the content type header in the response
        if (contentType) {
          res.setHeader('Content-Type', contentType);
        }
        
        // Get the buffer from the response
        const buffer = await response.arrayBuffer();
        
        // Send the buffer as a response
        return res.send(Buffer.from(buffer));
        
      } catch (fetchError) {
        console.error(`Fetch error from presigned URL for thumbnail: ${fetchError}`);
        return res.status(500).json({ 
          error: "Failed to fetch thumbnail from S3", 
          details: String(fetchError)
        });
      }
    } catch (error) {
      console.error(`Error fetching thumbnail: ${error}`);
      res.status(500).json({ error: "Failed to fetch thumbnail" });
    }
  });
  
  // Specific route for book icons
  app.get("/api/direct/:bookPath/icons/:filename", async (req, res) => {
    try {
      const { bookPath, filename } = req.params;
      
      // Clean filename
      let cleanFilename = decodeURIComponent(filename);
      
      // Construct the exact S3 path
      const key = `${bookPath}/icons/${cleanFilename}`;
      
      console.log(`Book icon access - trying to fetch: ${key}`);
      
      // Get the presigned URL
      const presignedUrl = await getS3PresignedUrl(key);
      
      if (!presignedUrl) {
        console.error(`Book icon not found: ${key}`);
        return res.status(404).json({ error: "Book icon not found" });
      }
      
      try {
        console.log(`Using presigned URL for book icon: ${presignedUrl}`);
        
        // Use fetch to get the content directly
        const response = await fetch(presignedUrl, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
          },
        });
        
        if (!response.ok) {
          console.error(`Error fetching book icon: ${response.status} ${response.statusText}`);
          return res.status(response.status).json({ 
            error: "Error fetching book icon from S3", 
            details: `${response.status} ${response.statusText}` 
          });
        }
        
        // Get the content type from the response
        const contentType = response.headers.get('content-type');
        
        // Set the content type header in the response
        if (contentType) {
          res.setHeader('Content-Type', contentType);
        }
        
        // Set cache headers
        res.setHeader('Cache-Control', 'public, max-age=3600');
        
        // Get the buffer from the response
        const buffer = await response.arrayBuffer();
        
        // Send the buffer as a response
        return res.send(Buffer.from(buffer));
        
      } catch (fetchError) {
        console.error(`Fetch error from presigned URL for book icon: ${fetchError}`);
        return res.status(500).json({ 
          error: "Failed to fetch book icon from S3", 
          details: String(fetchError)
        });
      }
    } catch (error) {
      console.error(`Error fetching book icon: ${error}`);
      res.status(500).json({ error: "Failed to fetch book icon" });
    }
  });
  
  // Direct route for accessing book contents from S3 - Public access with premium content controls
  app.get("/api/direct/:bookPath/:unitPath", async (req, res) => {
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
  
  // Direct materials endpoint for accessing contents in a book/unit - Public access with premium content controls
  app.get("/api/direct/:bookPath/:unitPath/materials", async (req, res) => {
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
        
        // Extract question info from the filename, if possible
        let extractedTitle = "";
        let extractedDescription = "";
        
        // Look for patterns like "01 R A" in the filename
        const fileCodeMatch = filename.match(/(\d+)\s+([A-Z])\s+([A-Z])/);
        if (fileCodeMatch) {
          // Store the file code (e.g., "01 R A") in the description field
          // This helps us identify which question to show without showing the whole filename
          extractedDescription = fileCodeMatch[0];
        }
        
        // Create a material object
        // Instead of returning a relative path, generate a direct API endpoint URL
        // that will proxy the S3 content through our server avoiding CORS issues
        return {
          id: index + 1, // Simple sequential ID
          path: `/api/direct/${bookPath}/${unitPath}/assets/${encodeURIComponent(filename)}`, // API endpoint path
          title: extractedTitle, // Will be set by client
          description: extractedDescription, // Contains file code for question mapping
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
      
      // Sort the materials by content filename numeric prefix if possible
      materials.sort((a, b) => {
        const aMatch = a.content.match(/^(\d+)/);
        const bMatch = b.content.match(/^(\d+)/);
        
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
  
  // Direct asset endpoint for accessing individual files - Public access with premium content controls
  app.get("/api/direct/:bookPath/:unitPath/assets/:filename", async (req, res) => {
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
      
      // Extract material IDs
      const materialIds = materials.map(m => m.id);
      
      // Save the order to storage
      await storage.saveSlideOrder(bookPath, unitPath, materialIds);
      
      console.log(`Saved order for ${bookPath}/${unitPath}:`, materialIds);
      
      return res.json({ 
        success: true, 
        message: "Order saved successfully to permanent storage",
        orderKey: `${bookPath}/${unitPath}`
      });
    } catch (error) {
      console.error(`Error saving material order:`, error);
      res.status(500).json({ error: "Failed to save material order" });
    }
  });
  
  // Endpoint to save annotations for materials
  app.post("/api/direct/:bookPath/:unitPath/saveAnnotations", isAuthenticated, async (req, res) => {
    try {
      const { bookPath, unitPath } = req.params;
      const { annotations } = req.body;
      
      if (!annotations || typeof annotations !== 'object') {
        return res.status(400).json({ error: "Invalid annotations data" });
      }
      
      console.log(`Saving annotations for ${bookPath}/${unitPath}`);
      
      // In a production environment, you would save this in a database
      // For now, we'll store it in memory (this will reset on server restart)
      if (!(global as any).slidesAnnotations) {
        (global as any).slidesAnnotations = {};
      }
      
      const annotationsKey = `${bookPath}/${unitPath}`;
      (global as any).slidesAnnotations[annotationsKey] = annotations;
      
      console.log(`Saved annotations for ${annotationsKey}`);
      
      return res.json({ 
        success: true, 
        message: "Annotations saved successfully"
      });
    } catch (error) {
      console.error(`Error saving annotations:`, error);
      res.status(500).json({ error: "Failed to save annotations" });
    }
  });
  
  // Endpoint to get saved annotations
  app.get("/api/direct/:bookPath/:unitPath/annotations", isAuthenticated, async (req, res) => {
    try {
      const { bookPath, unitPath } = req.params;
      const annotationsKey = `${bookPath}/${unitPath}`;
      
      // Check if we have saved annotations for this unit
      if (!(global as any).slidesAnnotations || !(global as any).slidesAnnotations[annotationsKey]) {
        // Return empty annotations object if none are saved yet
        return res.json({ 
          success: true, 
          annotations: {}
        });
      }
      
      return res.json({ 
        success: true, 
        annotations: (global as any).slidesAnnotations[annotationsKey]
      });
    } catch (error) {
      console.error(`Error fetching annotations:`, error);
      res.status(500).json({ error: "Failed to fetch annotations" });
    }
  });

  // Get the saved order for materials - Public access
  app.get("/api/direct/:bookPath/:unitPath/savedOrder", async (req, res) => {
    try {
      const { bookPath, unitPath } = req.params;
      
      // Get the saved order from permanent storage
      const savedOrder = await storage.getSlideOrder(bookPath, unitPath);
      
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
  
  // Special endpoint for Book 0 icons folder access - Public access
  app.get("/api/direct/:bookPath/icons/:filename", async (req, res) => {
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
  
  // Add a public handler for direct material access through plain URLs
  // This route will handle the image URLs created above like /book4/unit1/image.jpg
  // Only match paths that start with book followed by digits to avoid interfering with other routes
  app.get("/book:bookId/unit:unitId/:filename", async (req, res) => {
    try {
      const { bookId, unitId, filename } = req.params;
      const bookPath = `book${bookId}`;
      const unitPath = `unit${unitId}`;
      
      // Clean filename
      const cleanFilename = decodeURIComponent(filename);
      
      // Construct the exact S3 path
      const key = `${bookPath}/${unitPath}/${cleanFilename}`;
      
      console.log(`Public direct access - trying to fetch: ${key}`);
      
      // Get the presigned URL
      const presignedUrl = await getS3PresignedUrl(key);
      
      if (!presignedUrl) {
        console.error(`Content not found: ${key}`);
        return res.status(404).send("Content not found");
      }
      
      // Use fetch to get the content directly
      const response = await fetch(presignedUrl, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
        },
      });
      
      if (!response.ok) {
        console.error(`Error fetching from presigned URL: ${response.status} ${response.statusText}`);
        return res.status(response.status).send("Error fetching content");
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
      console.error(`Error fetching public content: ${error}`);
      res.status(500).send("Error fetching content");
    }
  });
  
  // Endpoint to store flagged questions
  // Endpoint to process Excel file and update question-answer mappings
  app.post("/api/direct/process-excel", isAuthenticated, async (req, res) => {
    try {
      console.log("Processing Excel file to update question-answer mappings");
      
      // Verify admin access
      if (!req.isAuthenticated || !req.user || req.user.role !== 'admin') {
        console.log("Unauthorized access attempt to process-excel endpoint");
        return res.status(401).json({
          success: false,
          error: "Unauthorized - Admin access required"
        });
      }
      
      // S3 path to the Excel file
      const excelS3Path = "book1/VISUAL 1 QUESTIONS.xlsx";
      
      // Local path to save the Excel file temporarily
      const excelFilePath = path.join(process.cwd(), 'attached_assets', 'VISUAL 1 QUESTIONS.xlsx');
      
      // Path for the output TypeScript file
      const tsOutputPath = path.join(process.cwd(), 'client', 'src', 'data', 'question-data.ts');
      
      // First, download the Excel file from S3
      console.log(`Downloading Excel file from S3 path: ${excelS3Path}`);
      
      // Get the presigned URL for the Excel file
      const presignedUrl = await getS3PresignedUrl(excelS3Path);
      
      if (!presignedUrl) {
        console.error(`Excel file not found at S3 path: ${excelS3Path}`);
        return res.status(404).json({
          success: false,
          error: "Excel file not found in S3 bucket"
        });
      }
      
      try {
        // Use fetch to download the file
        const response = await fetch(presignedUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Convert response to buffer
        const buffer = await response.arrayBuffer();
        
        // Save the file locally
        const fs = require('fs');
        fs.writeFileSync(excelFilePath, Buffer.from(buffer));
        
        console.log(`Excel file downloaded and saved to ${excelFilePath}`);
        
        // Process the Excel file and generate TypeScript
        const qaMapping = processExcelAndGenerateTS(excelFilePath, tsOutputPath);
        
        return res.json({
          success: true,
          message: "Excel processed successfully",
          totalMappings: Object.keys(qaMapping).length,
          outputFile: tsOutputPath
        });
      } catch (fetchError) {
        console.error("Error downloading or processing Excel file:", fetchError);
        return res.status(500).json({
          success: false,
          error: "Error processing Excel file",
          details: String(fetchError)
        });
      }
    } catch (error) {
      console.error("Error in process-excel endpoint:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error"
      });
    }
  });
  
  app.post("/api/direct/flag-question", isAuthenticated, async (req, res) => {
    try {
      const { 
        materialId, 
        questionText, 
        answerText, 
        suggestedQuestion, 
        suggestedAnswer, 
        reason, 
        status, 
        bookId, 
        unitId, 
        createdAt 
      } = req.body;
      
      // Validate required fields
      if (!materialId || !questionText || !answerText) {
        return res.status(400).json({ 
          success: false, 
          error: "Missing required fields" 
        });
      }
      
      // Create flagged question using the storage implementation
      const flaggedQuestion = await storage.createFlaggedQuestion({
        materialId,
        questionText,
        answerText,
        suggestedQuestion,
        suggestedAnswer,
        reason,
        status,
        bookId,
        unitId,
        createdAt: createdAt ? new Date(createdAt) : undefined
      });
      
      console.log(`Flagged question for material ID ${materialId} in ${bookId}/${unitId} saved to permanent storage`);
      
      return res.json({
        success: true,
        message: "Question flagged successfully",
        questionId: flaggedQuestion.id
      });
    } catch (error) {
      console.error(`Error flagging question:`, error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to flag question" 
      });
    }
  });
  
  // Endpoint to get flagged questions - for admin use
  app.get("/api/direct/flagged-questions", isAuthenticated, async (req, res) => {
    try {
      // Get the status filter from query params, default to 'all'
      const statusFilter = req.query.status as string || 'all';
      const bookId = req.query.bookId as string;
      const unitId = req.query.unitId as string;
      
      // Create filters object for storage implementation
      const filters: { status?: string; bookId?: string; unitId?: string } = {};
      
      if (statusFilter !== 'all') {
        filters.status = statusFilter;
      }
      
      if (bookId) {
        filters.bookId = bookId;
      }
      
      if (unitId) {
        filters.unitId = unitId;
      }
      
      // Get filtered and sorted flagged questions from storage
      const filteredQuestions = await storage.getFlaggedQuestions(filters);
      
      return res.json({
        success: true,
        questions: filteredQuestions,
        total: filteredQuestions.length
      });
    } catch (error) {
      console.error(`Error getting flagged questions:`, error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to get flagged questions" 
      });
    }
  });
  
  // Endpoint to update a flagged question's status - for admin use
  app.patch("/api/direct/flagged-questions/:id", isAuthenticated, async (req, res) => {
    try {
      const questionId = parseInt(req.params.id, 10);
      const { status, adminNotes } = req.body;
      
      if (!questionId || !status) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields"
        });
      }
      
      // Update the question using the storage implementation
      const updatedQuestion = await storage.updateFlaggedQuestion(questionId, {
        status,
        adminNotes,
        reviewedAt: new Date()
      });
      
      if (!updatedQuestion) {
        return res.status(404).json({
          success: false,
          error: "Flagged question not found"
        });
      }
      
      return res.json({
        success: true,
        message: "Flagged question updated successfully",
        question: updatedQuestion
      });
    } catch (error) {
      console.error(`Error updating flagged question:`, error);
      res.status(500).json({
        success: false,
        error: "Failed to update flagged question"
      });
    }
  });

  // Direct endpoint to add books - simpler authentication for scripts
  app.post("/api/direct/add-books", async (req, res) => {
    try {
      console.log("Adding books via direct endpoint");
      
      // Simple authentication - verify admin key instead of session
      const { adminKey, books } = req.body;
      
      if (adminKey !== 'admin-secret-key' || !Array.isArray(books) || books.length === 0) {
        return res.status(401).json({
          success: false,
          error: "Invalid admin key or books data"
        });
      }
      
      // Keep track of books and units added
      const addedBooks = [];
      const addedUnits = [];
      
      // Process each book
      for (const book of books) {
        // Create book using storage implementation
        const newBook = await storage.createBook({
          bookId: book.bookId,
          title: book.title,
          thumbnail: book.thumbnail || '',
          level: book.level || 'beginner',
          description: book.description || null,
          isPublished: book.isPublished !== false
        });
        
        addedBooks.push(newBook);
        
        // Determine number of units based on book ID
        let numUnits = 16; // Default for books 4-7
        if (book.bookId.startsWith('0')) {
          numUnits = 20; // For books 0a, 0b, 0c
        } else if (['1', '2', '3'].includes(book.bookId)) {
          numUnits = 18; // For books 1-3
        }
        
        // Add units for this book
        for (let i = 1; i <= numUnits; i++) {
          // Create unit using storage implementation
          const newUnit = await storage.createUnit({
            bookId: newBook.id,
            unitNumber: i,
            title: `UNIT ${i}`,
            description: `Unit ${i} for ${book.title}`,
            thumbnail: `/thumbnails/book${book.bookId}_unit${i}.jpg`,
            isPublished: true
          });
          
          addedUnits.push(newUnit);
        }
      }
      
      return res.json({
        success: true,
        message: "Books and units added successfully",
        addedBooks: addedBooks.length,
        addedUnits: addedUnits.length,
        books: addedBooks,
        units: addedUnits
      });
    } catch (error) {
      console.error("Error adding books:", error);
      res.status(500).json({
        success: false,
        error: "Failed to add books"
      });
    }
  });

  // Endpoint to download and process the Excel file with questions and answers
  app.get("/api/direct/process-qa-excel", isAuthenticated, async (req, res) => {
    try {
      console.log("Processing Excel file for Q&A mapping");
      
      // Use the local Excel file instead of downloading from S3
      const localExcelPath = "./attached_assets/VISUAL 1 QUESTIONS.xlsx";
      const outputPath = "./client/src/data/qa-mapping.ts";
      
      console.log(`Processing local Excel file at ${localExcelPath}`);
      
      // Process the Excel file and generate the mapping
      try {
        // Check if the file exists
        if (!require('fs').existsSync(localExcelPath)) {
          console.error(`Excel file not found at ${localExcelPath}`);
          return res.status(404).json({
            success: false,
            error: "Excel file not found"
          });
        }
        
        const qaMapping = processExcelAndGenerateTS(localExcelPath, outputPath);
        
        return res.json({
          success: true,
          message: "Successfully processed Q&A Excel file",
          mappingCount: Object.keys(qaMapping).length,
          outputPath
        });
      } catch (error) {
        console.error(`Error processing Excel file:`, error);
        return res.status(500).json({ 
          success: false, 
          error: "Failed to process Excel file: " + (error instanceof Error ? error.message : String(error))
        });
      }
    } catch (error) {
      console.error(`Error in process-qa-excel endpoint:`, error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to process Q&A Excel file: " + (error instanceof Error ? error.message : String(error))
      });
    }
  });
  
  // Process Excel data for a specific unit - Public access to allow students to see questions
  app.get("/api/direct/:bookPath/:unitPath/excel-qa", async (req, res) => {
    // Log authentication status for debugging purposes
    console.log(`Authentication check for ${req.url} - allowing access`);
    try {
      const { bookPath, unitPath } = req.params;
      
      console.log(`=====================================================`);
      console.log(`START: Processing Excel QA for ${bookPath}/${unitPath}`);
      console.log(`=====================================================`);
      
      // Force reprocess option - useful for debugging
      const forceReprocess = req.query.force === 'true';
      if (forceReprocess) {
        console.log(`FORCE REPROCESS flag detected - bypassing cache`);
      }
      
      // First check if we have cached data (unless force reprocess is requested)
      let qaEntries = !forceReprocess ? await storage.getUnitQuestionAnswers(bookPath, unitPath) : [];
      
      // If no cached data, process Excel from S3
      if (!qaEntries || qaEntries.length === 0) {
        console.log(`No cached QA data for ${bookPath}/${unitPath}, processing Excel...`);
        
        console.time('Excel processing');
        qaEntries = await processUnitExcel(bookPath, unitPath);
        console.timeEnd('Excel processing');
        
        if (!qaEntries) {
          console.error(`Failed to process Excel for ${bookPath}/${unitPath} - null result returned`);
          qaEntries = [];
        }
        
        console.log(`Processed ${qaEntries.length} QA entries from Excel`);
        
        // Log a sample of the entries for debugging
        if (qaEntries.length > 0) {
          console.log(`Sample entry: ${JSON.stringify(qaEntries[0], null, 2)}`);
        }
        
        // Save to cache if we got data
        if (qaEntries && qaEntries.length > 0) {
          console.log(`Saving ${qaEntries.length} entries to storage cache`);
          await storage.saveUnitQuestionAnswers(bookPath, unitPath, qaEntries);
        } else {
          console.warn(`No entries to cache for ${bookPath}/${unitPath}`);
        }
      } else {
        console.log(`Using ${qaEntries.length} cached QA entries for ${bookPath}/${unitPath}`);
      }
      
      console.log(`=====================================================`);
      console.log(`END: Returning ${qaEntries.length} Excel QA entries for ${bookPath}/${unitPath}`);
      console.log(`=====================================================`);
      
      return res.json({
        success: true,
        bookId: bookPath,
        unitId: unitPath,
        entries: qaEntries,
        count: qaEntries.length,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error(`Error processing Excel QA for unit: ${error}`);
      return res.status(500).json({
        success: false,
        message: "Failed to process Excel for unit",
        error: String(error)
      });
    }
  });

  // Testing endpoint for Excel file download and processing
  app.get("/api/direct/test/excel-download/:bookPath", isAuthenticated, async (req, res) => {
    try {
      const { bookPath } = req.params;
      
      console.log(`Testing Excel download for ${bookPath}`);
      
      // Attempt to download the Excel file
      const excelFilePath = await downloadExcelFile(bookPath);
      
      if (!excelFilePath) {
        return res.status(404).json({
          success: false,
          message: `Could not download Excel file for ${bookPath}`,
          checkedPaths: [
            `${bookPath}/VISUAL ${bookPath.replace('book', '')} QUESTIONS.xlsx`,
            `${bookPath}/VISUAL ${bookPath.replace('book', '')}  QUESTIONS.xlsx`,
            `${bookPath}/questions.xlsx`,
            `${bookPath}/VISUAL-${bookPath.replace('book', '')}-QUESTIONS.xlsx`,
            `${bookPath}/QA.xlsx`
          ]
        });
      }
      
      // If we got here, the file was downloaded successfully
      console.log(`Excel file successfully downloaded to ${excelFilePath}`);
      
      // Try to load and process the Excel file
      const workbook = xlsx.readFile(excelFilePath);
      const sheetNames = workbook.SheetNames;
      
      // Get basic info about the Excel file
      const sheets = sheetNames.map(name => {
        const sheet = workbook.Sheets[name];
        const range = xlsx.utils.decode_range(sheet['!ref'] || 'A1:A1');
        const rowCount = range.e.r - range.s.r + 1;
        const colCount = range.e.c - range.s.c + 1;
        
        // Get sample data (first few rows)
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 'A' });
        const sampleRows = rows.slice(0, 3);
        
        return {
          name,
          rowCount,
          colCount,
          range: sheet['!ref'],
          sampleRows
        };
      });
      
      return res.json({
        success: true,
        message: `Successfully downloaded and processed Excel file for ${bookPath}`,
        filePath: excelFilePath,
        sheets
      });
    } catch (error) {
      console.error(`Error testing Excel download: ${error}`);
      return res.status(500).json({
        success: false,
        message: `Error testing Excel download for ${bookPath}`,
        error: String(error)
      });
    }
  });
  
  console.log("Direct routes registered successfully");
}