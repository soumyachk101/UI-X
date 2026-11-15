"use client";

import * as React from "react";
import { FileUpload } from "./file-upload";

export default function FileUploadDemo() {
  const handleUpload = (files: File[]) => {
    console.log("Uploaded files:", files);
  };

  return (
    <div className="w-full max-w-md">
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        Upload files
      </label>
      <FileUpload accept="image/*,.pdf" onUpload={handleUpload} multiple />
    </div>
  );
}
