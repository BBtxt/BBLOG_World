// pages/rgb.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageModal from "@/components/imageModal";
import Image from "next/image";

interface Photo {
  id: string;
  url: string;
  width: number;
  height: number;
}

const Rgb = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch photos when component mounts
  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch("/api/lightroom/albums?albumName=webRGB");
        const data = await response.json();
        setPhotos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  const handleNext = () => {
    setSelectedIndex((current) =>
      current >= photos.length - 1 ? 0 : current + 1,
    );
  };

  const handlePrev = () => {
    setSelectedIndex((current) =>
      current <= 0 ? photos.length - 1 : current - 1,
    );
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (photos.length === 0) {
    return <div>No photos found</div>;
  }

  const currentPhoto = photos[selectedIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AnimatePresence initial={false}>
        <div className="flex justify-center items-center">
          <Image
            key={currentPhoto.id}
            src={currentPhoto.url}
            alt="Color Picture"
            className="object-contain w-1/3 lg:w-1/2 cursor-pointer"
            width={500}
            height={500}
            onClick={handleImageClick}
          />
        </div>
      </AnimatePresence>

      <div className="flex justify-center gap-2 mt-4">
        <button onClick={handlePrev}>Prev</button>
        <p className="text-xl">/</p>
        <button onClick={handleNext}>Next</button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <ImageModal imageUrl={currentPhoto.url} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Rgb;
