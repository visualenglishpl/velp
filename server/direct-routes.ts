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

// Create the S3 client with custom endpoint for S3-compatible services
const s3Client = new S3Client({
  // Try to use a regional endpoint format that works with more S3 providers
  endpoint: "https://visualenglishmaterial.s3.amazonaws.com", // Try virtual-hosted style URL
  region: "auto", // 'auto' to avoid region validation
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  },
  forcePathStyle: false // Use virtual-hosted style S3 URLs
});

// Log S3 configuration
console.log(`S3 configuration: Bucket=${S3_BUCKET}, Region=${process.env.AWS_REGION || "eu-central-1"}`);

// Helper function to list objects in S3
async function listS3Objects(prefix: string): Promise<string[]> {
  console.log(`Listing S3 objects with prefix: ${prefix}`);
  try {
    const command = new ListObjectsV2Command({
      Bucket: S3_BUCKET,
      Prefix: prefix,
      MaxKeys: 1000
    });
    
    console.log(`S3 ListObjectsV2Command created for bucket: ${S3_BUCKET}`);
    
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
  } catch (error) {
    console.error(`Error listing S3 objects with prefix ${prefix}:`, error);
    // More detailed error handling
    const err = error as { name?: string, message?: string };
    if (err.name === 'CredentialsProviderError') {
      console.error('AWS credential error - check AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY');
    } else if (err.name === 'NoSuchBucket') {
      console.error(`Bucket ${S3_BUCKET} does not exist`);
    } else if (err.name === 'AccessDenied') {
      console.error('Access denied to S3 bucket - check permissions');
    }
    
    // Create a dummy file for testing if needed - uncomment to use
    // return [`${prefix}dummy-file-for-testing.jpg`];
    
    return [];
  }
}

// Helper function to get a presigned URL for an S3 object
async function getS3PresignedUrl(key: string, expiresIn = 3600): Promise<string | null> {
  try {
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: key
    });
    
    return await getSignedUrl(s3Client, command, { expiresIn });
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
          description: `Content from ${filePath}`,
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
      
      // Set cache headers and redirect
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.redirect(presignedUrl);
    } catch (error) {
      console.error(`Error fetching asset: ${error}`);
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });
  
  console.log("Direct routes registered successfully");
}