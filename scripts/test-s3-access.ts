import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Configuration
const S3_BUCKET = process.env.S3_BUCKET || "visualenglishmaterial";
const PATHS_TO_CHECK = [
  "", // Root
  "book3/unit12/",
  "book4/unit4/",
  "book7/unit12/"
];

// Create S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  },
  // Fix for the PermanentRedirect error
  endpoint: "https://s3.eu-central-1.amazonaws.com",
  forcePathStyle: true
});

// Helper to list objects
async function listS3Objects(prefix: string) {
  console.log(`\nListing objects with prefix: "${prefix}"`);
  
  try {
    const command = new ListObjectsV2Command({
      Bucket: S3_BUCKET,
      Prefix: prefix,
      MaxKeys: 20
    });
    
    const response = await s3Client.send(command);
    
    if (!response.Contents || response.Contents.length === 0) {
      console.log(`No objects found with prefix "${prefix}"`);
      return;
    }
    
    console.log(`Found ${response.Contents.length} objects:`);
    response.Contents.forEach((item, index) => {
      console.log(`${index + 1}. ${item.Key}`);
    });
    
    // Get a presigned URL for the first object if available
    if (response.Contents.length > 0 && response.Contents[0].Key) {
      const key = response.Contents[0].Key;
      try {
        const cmd = new GetObjectCommand({
          Bucket: S3_BUCKET,
          Key: key
        });
        
        const url = await getSignedUrl(s3Client, cmd, { expiresIn: 3600 });
        console.log(`\nPresigned URL for ${key}:`);
        console.log(url);
      } catch (err) {
        console.error(`Error generating presigned URL: ${err}`);
      }
    }
  } catch (err) {
    console.error(`Error listing objects: ${err}`);
  }
}

async function runTests() {
  console.log("====== S3 ACCESS TEST ======");
  console.log(`Bucket: ${S3_BUCKET}`);
  console.log(`Region: ${process.env.AWS_REGION || "eu-central-1"}`);
  console.log(`AWS Access Key ID: ${process.env.AWS_ACCESS_KEY_ID ? "****" + process.env.AWS_ACCESS_KEY_ID.slice(-4) : "NOT SET"}`);
  console.log(`AWS Secret Access Key: ${process.env.AWS_SECRET_ACCESS_KEY ? "********" : "NOT SET"}`);
  
  // Test each path
  for (const path of PATHS_TO_CHECK) {
    await listS3Objects(path);
  }
}

// Run the tests
runTests().then(() => {
  console.log("\nTests completed!");
}).catch(err => {
  console.error("Test failed with error:", err);
});