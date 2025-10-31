import { NextRequest, NextResponse } from "next/server";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { s3Client, S3_BUCKET_NAME } from "@/lib/s3";
import { z } from "zod";

// Allowed file types for 3D models and images
const ALLOWED_CONTENT_TYPES = [
  "model/gltf-binary",
  "model/gltf+json",
  "application/octet-stream", // .glb, .obj, .fbx
  "application/zip",
  "image/png",
  "image/jpeg",
  "image/webp",
];

const presignSchema = z.object({
  key: z.string().min(1).max(200),
  contentType: z.string().refine(
    (type) => ALLOWED_CONTENT_TYPES.includes(type),
    {
      message: "Invalid content type. Only 3D models and images are allowed.",
    }
  ),
  maxSize: z.number().int().positive().max(100 * 1024 * 1024).optional(), // Max 100MB
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { key, contentType, maxSize = 50 * 1024 * 1024 } =
      presignSchema.parse(body);

    if (!S3_BUCKET_NAME) {
      return NextResponse.json(
        { error: "S3 bucket not configured" },
        { status: 500 }
      );
    }

    // Generate a unique key with timestamp prefix
    const timestamp = Date.now();
    const uniqueKey = `uploads/${timestamp}-${key}`;

    // Create presigned POST data
    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: S3_BUCKET_NAME,
      Key: uniqueKey,
      Conditions: [
        ["content-length-range", 0, maxSize],
        ["eq", "$Content-Type", contentType],
      ],
      Fields: {
        "Content-Type": contentType,
      },
      Expires: 600, // 10 minutes
    });

    return NextResponse.json(
      {
        url,
        fields,
        key: uniqueKey,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Presign error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create presigned URL" },
      { status: 500 }
    );
  }
}
