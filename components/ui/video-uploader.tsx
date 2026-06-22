"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { uploadToDropbox } from "@/lib/connectDropbox";
import { toast } from "sonner";

interface VideoUploaderProps {
  value?: string;
  onChange: (url: string, duration?: string, videoData?: File) => void;  // add duration
  className?: string;
  deleteAfterUpload?: boolean;
}

export function VideoUploader({ value, onChange, className, deleteAfterUpload = false }: VideoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localVideoUrl, setLocalVideoUrl] = useState<string | null>(null);
  const [isUploadComplete, setIsUploadComplete] = useState(!!value);

  useEffect(() => {
    setIsUploadComplete(!!value);
  }, [value]);

const onDrop = useCallback(
  async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);

      // Read duration from file before uploading
      const duration = await new Promise<string>((resolve) => {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
          URL.revokeObjectURL(video.src);
          const m = Math.floor(video.duration / 60);
          const s = Math.floor(video.duration % 60);
          resolve(`${m}:${s.toString().padStart(2, "0")}`);
        };
        video.onerror = () => resolve("");
        video.src = URL.createObjectURL(file);
      });

      const filePath = `/uploads/video/${Date.now()}${file.name}`;
      const uploadResult = await uploadToDropbox(file, filePath);
      setLocalVideoUrl(uploadResult);
      onChange(uploadResult, duration, file);  // pass duration
      setIsUploadComplete(true);
    } catch (err) {
      setLocalVideoUrl(null);
      setError(err instanceof Error ? err.message : "Failed to upload video");
    } finally {
      setIsUploading(false);
    }
  },
  [onChange]
);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const removeVideo = async () => {

    if (!displayUrl) return;

    const response = await fetch("/api/admin/delete-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: displayUrl }),
    });

    if (response.ok) {
      setLocalVideoUrl(null);
      setIsUploadComplete(false);
      onChange("", undefined);
      toast.success("Video deleted successfully")
    }else{
      setLocalVideoUrl(null);
      setIsUploadComplete(false);
      onChange("", undefined);
    }
  };

  const displayUrl = localVideoUrl || value;

  return (
    <div className={cn("space-y-4 w-full", className)}>
      {displayUrl && isUploadComplete ? (
        <div className="relative w-full max-w-[400px] aspect-video overflow-hidden rounded-lg border border-black/20">
          <video src={value ? value : `{${displayUrl}?t=${Date.now()}`} onError={() => {
            setLocalVideoUrl(null);
            setIsUploadComplete(false);
            onChange("", undefined);
          }} controls className="object-cover w-full h-full" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 bg-red-500"
            onClick={removeVideo}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-colors hover:border-gray-400",
            "flex flex-col items-center justify-center gap-2 cursor-pointer",
            isDragActive && "border-blue-500 bg-blue-50",
            isUploading && "pointer-events-none opacity-60"
          )}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
              <p className="text-sm text-gray-600">Uploading...</p>
            </>
          ) : (
            <>
              <Upload className="h-10 w-10 text-gray-400" />
              <p className="text-sm text-gray-600">
                {isDragActive ? "Drop the video here" : "Drag & drop a video here, or click to select"}
              </p>
            </>
          )}
        </div>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
