import { S3Client } from "@aws-sdk/client-s3";

if (!process.env.S3_REGION) {
  console.warn("S3_REGION not configured - upload functionality will not work");
}

export const s3Client = new S3Client({
  region: process.env.S3_REGION || "auto",
  endpoint: process.env.S3_ENDPOINT,
  credentials: process.env.S3_ACCESS_KEY_ID
    ? {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
      }
    : undefined,
});

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || "";
