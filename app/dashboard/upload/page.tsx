"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setResult(null);

    try {
      // Step 1: Request presigned URL
      setProgress(10);
      const presignResponse = await fetch("/api/storage/presign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: file.name,
          contentType: file.type || "application/octet-stream",
          maxSize: file.size,
        }),
      });

      if (!presignResponse.ok) {
        const error = await presignResponse.json();
        throw new Error(error.error || "Failed to get upload URL");
      }

      const { url, fields } = await presignResponse.json();
      setProgress(30);

      // Step 2: Upload file to S3/R2
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      setProgress(50);
      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }

      setProgress(100);
      setResult({
        success: true,
        message: `File "${file.name}" uploaded successfully!`,
      });

      // Reset form
      setFile(null);
      const fileInput = document.getElementById(
        "file-input"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      setResult({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Upload failed. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-sm text-muted hover:underline">
            ← Back to home
          </Link>
        </div>

        <h1 className="font-display text-3xl mb-4">Upload 3D Model</h1>
        <p className="text-muted mb-8">
          Upload your 3D models to our platform. Supported formats: GLB, GLTF,
          OBJ, FBX, and ZIP archives.
        </p>

        <div className="card p-8">
          <div className="mb-6">
            <label
              htmlFor="file-input"
              className="block font-semibold mb-2 text-sm"
            >
              Select File
            </label>
            <input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              accept=".glb,.gltf,.obj,.fbx,.zip,.png,.jpg,.jpeg,.webp"
              className="block w-full text-sm border border-muted/60 rounded-lg p-2"
              disabled={uploading}
            />
            {file && (
              <div className="mt-2 text-sm text-muted">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                MB)
              </div>
            )}
          </div>

          {uploading && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Uploading...</span>
                <span className="text-sm text-muted">{progress}%</span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {result && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                result.success
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {result.message}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>

          <p className="text-xs text-muted mt-4">
            Note: Files are uploaded to your configured S3-compatible storage.
            Make sure your environment variables are properly set.
          </p>
        </div>

        <div className="mt-8 card p-6">
          <h2 className="font-semibold mb-3">Upload Guidelines</h2>
          <ul className="text-sm text-muted space-y-2 list-disc pl-5">
            <li>Maximum file size: 50 MB</li>
            <li>Supported formats: GLB, GLTF, OBJ, FBX, ZIP</li>
            <li>Images: PNG, JPEG, WebP (for thumbnails)</li>
            <li>Ensure your models are optimized for web viewing</li>
            <li>Include proper textures and materials in the file</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
