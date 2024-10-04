"use client";

import Image from "next/image";
import { useState, ChangeEvent } from "react";
import dynamic from "next/dynamic";

const FirebaseUploader = dynamic(() => import("./FirebaseUploader"), {
    ssr: false,
});

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUploadComplete = (url: string | null) => {
        setUploadedUrl(url);
    };

    return (
        <div className="flex h-[calc(100vh-100px)] justify-center items-center">
            <div className="p-8 rounded shadow-md w-full max-w-md text-center">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-foreground mb-4"
                />
                <FirebaseUploader
                    file={file}
                    onUploadComplete={handleUploadComplete}
                />

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
