"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Globe from "./components/Globe";

export default function EnterPage() {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const videoUrl = "https://res.cloudinary.com/daa405978/video/upload/q_auto,f_auto,c_fill/hero/001";

  const handleEnter = () => {
    setIsAnimating(true);
    // Wait for animation to complete before navigation
    const animationDuration = 500; // Match this with your animation duration
    setTimeout(() => {
      router.prefetch("/main"); // Prefetch the next page
      router.push("/main");
    }, animationDuration);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center
      ${isAnimating ? "animate-fade-out" : "animate-fade-in"}`}>
      
      <div className="relative w-[92%] sm:w-[85%] md:w-[80%] aspect-video">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Globe />
          <div className="text-white text-lg md:text-3xl lg:text-4xl font-bold mt-2 sm:mt-4">
            BBLOG WORLD
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 md:mt-8">
        <Button
          variant="outline"
          onClick={handleEnter}
          // className="px-8 md:px-12 py-2 sm:py-3 md:py-4 text-base sm:text-lg md:text-xl lg:text-2xl"
        >
          Enter
        </Button>
      </div>
    </div>
  );
}