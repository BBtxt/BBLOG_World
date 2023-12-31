import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageModal from "@/components/imageModal";
import Image from "next/image";

const Rgb = () => {
  const totalImages = 8;
  const [selectedItem, setSelectedItem] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNext = () => {
    setSelectedItem((selectedItem) =>
      selectedItem >= totalImages ? 1 : selectedItem + 1
    );
  };

  const handlePrev = () => {
    setSelectedItem((selectedItem) =>
      selectedItem <= 1 ? totalImages : selectedItem - 1
    );
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const imageSrc = `/rgb/rgb-${selectedItem}.jpg`;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <AnimatePresence initial={false}>
      <div className="flex justify-center items-center">
      <Image
            key={selectedItem}
            src={imageSrc}
            alt="Monochrome Picture"
            className="object-contain w-1/3 lg:w-1/2 cursor-pointer"
            onClick={handleImageClick}
            width={500}
            height={500}
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
          <ImageModal imageUrl={imageSrc} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Rgb;
