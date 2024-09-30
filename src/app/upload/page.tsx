"use client";

import Image from "next/image";
import { useState, ChangeEvent } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);  // Define the file state type
  const [uploading, setUploading] = useState<boolean>(false); // State for the upload status
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null); // Store the uploaded image URL

  // Event handler for file change with type annotation
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);  // Set the selected file in state
    }
  };

  // Handle the upload logic with async/await
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      // Upload the file to Firebase storage
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef); // Get the download URL of the uploaded file
      setUploadedUrl(url);
      console.log("File Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading the file", error);
    } finally {
      setUploading(false); // Set uploading back to false after completion
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="p-8 rounded shadow-md w-full max-w-md text-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 mb-4"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="py-2 px-4 rounded w-full mb-4"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        {uploadedUrl && (
          <div>
            <p className="mb-2">Uploaded image:</p>
            <div className="w-72 h-72 mx-auto">
              <Image
                src={uploadedUrl}
                alt="Uploaded image"
                width={300}
                height={300}
                className="object-cover rounded"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
