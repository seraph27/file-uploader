"use client";

import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { useAuth } from "@clerk/nextjs";

interface FirebaseUploaderProps {
  file: File | null;
  onUploadComplete: (url: string | null) => void;
}

export default function FirebaseUploader({ file, onUploadComplete }: FirebaseUploaderProps) {
  const [uploading, setUploading] = useState<boolean>(false);
  const { userId } = useAuth();

  const handleUpload = async () => {
    if (!file || !userId) return;

    setUploading(true);
    const storageRef = ref(storage, `images/${userId}/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      onUploadComplete(url);
      console.log("File Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading the file", error);
      onUploadComplete(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <button
      onClick={handleUpload}
      disabled={uploading || !file || !userId}
      className="bg-blue-500 text-white py-2 px-4 rounded w-full mb-4"
    >
      {uploading ? "Uploading..." : "Upload Image"}
    </button>
  );
}