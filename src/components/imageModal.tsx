import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-full flex flex-col z-20 items-center justify-center bg-black/90 bg-opacity-75"
      onClick={onClose}
    >
      <Image
        src={imageUrl}
        alt="Picture"
        className="h-4/5 w-4/5 object-contain"
        onClick={(e) => e.stopPropagation()}
        width={500}
        height={500}
        
      />
      <button 
      className="mt-2"
      onClick={onClose}>Close</button>
    </motion.div>
  );
};

export default ImageModal;
