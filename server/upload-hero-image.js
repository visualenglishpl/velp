import fs from 'fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 Client with the same configuration used in the main app
const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  }
});

async function uploadImage() {
  try {
    const fileContent = fs.readFileSync('./attached_assets/image_1746541477910.png');
    
    const params = {
      Bucket: 'visualenglishmaterial',
      Key: 'VISUAL WEBSITE/new_hero_logo.png',
      Body: fileContent,
      ContentType: 'image/png'
    };
    
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    
    console.log('Image uploaded successfully:', response);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

uploadImage();
