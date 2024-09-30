"use client";

import Image from "next/image";
import { useState, ChangeEvent, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // New state for client-side check

  useEffect(() => {
    setIsClient(true); // Set this to true once the component is rendered on the client side
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setUploadedUrl(url);
      console.log("File Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading the file", error);
    } finally {
      setUploading(false);
    }
  };

  if (!isClient) {
    // Return null or some placeholder content when on the server
    return null;
  }

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 mb-4"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full mb-4"
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
