"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import { useAuth } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchImages = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const imagesRef = ref(storage, `images/${userId}`);
      try {
        const result = await listAll(imagesRef);
        const urlPromises = result.items.map(imageRef => getDownloadURL(imageRef));
        const urls = await Promise.all(urlPromises);
        setImages(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [userId]);

  if (!userId) {
    return <div className="text-center py-4">Please log in to view your images.</div>;
  }

  if (loading) {
    return <div className="text-center py-4">Loading images...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button>asdsd</Button>
      <h1 className="text-3xl font-bold mb-6 text-center">Your Image Gallery</h1>
      {images.length === 0 ? (
        <p className="text-center">You haven't uploaded any images yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={url}
                alt={`Your uploaded image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}