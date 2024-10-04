import { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../app/firebaseConfig";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const Gallery = () => {
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
                const urlPromises = result.items.map((imageRef) =>
                    getDownloadURL(imageRef)
                );
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
        return (
            <div className="text-center py-4">
                Please log in to view your images.
            </div>
        );
    }

    if (loading) {
        return <div className="text-center py-4">Loading images...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 h-[calc(100vh-100px)] flex items-center justify-center flex-col">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Your Image Gallery
            </h1>
            {images.length === 0 ? (
                <p className="text-center">
                    You haven't uploaded any images yet.
                </p>
            ) : (
                <div className="flex justify-center px-12">
                    <Carousel className="w-full max-w-xs">
                        <CarouselContent>
                            {images.map((url, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <img
                                                    src={url}
                                                    alt={`Image ${index + 1}`}
                                                    className="object-cover w-full h-full"
                                                />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            )}
        </div>
    );
};

export default Gallery;
