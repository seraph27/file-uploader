"use client";

import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

interface FirebaseUploaderProps {
  file: File | null;
  onUploadComplete: (url: string | null) => void;  // Changed to accept null
}

export default function FirebaseUploader({ file, onUploadComplete }: FirebaseUploaderProps) {
  const [uploading, setUploading] = useState<boolean>(false);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      onUploadComplete(url);
      console.log("File Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading the file", error);
      onUploadComplete(null);  // Call with null in case of error
    } finally {
      setUploading(false);
    }
  };

  return (
    <button
      onClick={handleUpload}
      disabled={uploading || !file}
      className="bg-blue-500 text-white py-2 px-4 rounded w-full mb-4"
    >
      {uploading ? "Uploading..." : "Upload Image"}
    </button>
  );
}