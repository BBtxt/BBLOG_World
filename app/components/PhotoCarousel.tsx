"use client"
import React, { useMemo } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CldImage } from 'next-cloudinary';

const PhotoCarousel = () => {
  // Generate 12 unique random numbers between 1 and 60
  const randomPhotos = useMemo(() => {
    const numbers = new Set();
    while (numbers.size < 12) {
      numbers.add(Math.floor(Math.random() * 60) + 1);
    }
    return Array.from(numbers);
  }, []); // Empty dependency array means this only runs once when component mounts

  return (
    <Carousel 
      className="w-full max-w-8xl mx-auto"
      opts={{
        align: "start",
        loop: true
      }}
    >
      <CarouselContent className="md:flex-row flex-col">
        {randomPhotos.map((photoNum) => (
          <CarouselItem key={photoNum as React.Key} className="basis-full">
            <div className="p-1">

                {/* Container with fixed aspect ratio */}
                <div className="flex items-center justify-center p-0 relative h-[80vh] md:h-[70vh]">
                  <div className="relative w-full h-full flex items-center justify-center ">
                    <CldImage
                      width="2000"
                      height="2000"
                      src={`photos/BBL-${photoNum}`}
                      alt={`Photo ${photoNum}`}
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                      sizes="(max-width: 768px) 100vw, 2000px"
                      priority={photoNum === randomPhotos[0]}
                      loading={photoNum === randomPhotos[0] ? "eager" : "lazy"}
                    />
                  </div>
                  </div>
                
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
      {/* Navigation arrows - hidden on mobile */}
      <div className="hidden md:block">
        <CarouselPrevious className="" />
        <CarouselNext className="" />
      </div>

      {/* Custom navigation for mobile */}
      <div className="mt-4 flex justify-center gap-2 md:hidden">
        <button 
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          aria-label="Previous image"
        >
          ↑
        </button>
        <button 
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          aria-label="Next image"
        >
          ↓
        </button>
      </div>
    </Carousel>
  );
};

export default PhotoCarousel;
