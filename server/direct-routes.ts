import { Express, Request, Response } from "express";
import { GetObjectCommand, S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// S3 configuration 
const S3_BUCKET = process.env.S3_BUCKET || "visualenglishmaterial";
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  }
});

// Helper function to list objects in S3
async function listS3Objects(prefix: string): Promise<string[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: S3_BUCKET,
      Prefix: prefix,
      MaxKeys: 1000
    });
    
    const response = await s3Client.send(command);
    if (!response.Contents) return [];
    
    return response.Contents
      .map(item => item.Key || "")
      .filter(key => key !== "");
  } catch (error) {
    console.error(`Error listing S3 objects with prefix ${prefix}:`, error);
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
  // Basic authentication middleware
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: "Not authenticated" });
  };
  
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