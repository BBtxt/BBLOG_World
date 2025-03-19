"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Globe from "./components/Globe";

export default function EnterPage() {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const videoUrl =
    "https://res.cloudinary.com/daa405978/video/upload/q_auto,f_auto,c_fill/hero/001";

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
    <div
      className={`min-h-screen w-full flex items-center justify-center
      ${isAnimating ? "animate-fade-out" : "animate-fade-in"}`}
    >
      {/* Center container with fixed width */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Main content container - space between keeps the content and button apart */}
        <div className="w-full flex flex-col items-center justify-between gap-8">
          {/* Video and Globe container with positioned text at the bottom */}
          <div className="relative w-full aspect-video">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src={videoUrl}
                type="video/mp4"
              />
            </video>

            {/* Globe centered in video */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe />
            </div>
            
            {/* Text positioned at the bottom of the video container */}
            <div className="absolute bottom-0 left-0 right-0 text-center">
              <p className="text-muted">BBLOG WORLD</p>
            </div>
          </div>

          {/* Button with clear vertical separation */}
          <div>
            <Button
              variant="outline"
              onClick={handleEnter}
            >
              Enter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
