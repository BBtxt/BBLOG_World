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
      className={`
      ${isAnimating ? "animate-fade-out" : "animate-fade-in"}`}
    >
      <div className="min-h-screen flex flex-col items-center justify-center px-4 container">
        <div className="relative max-w-screen-lg w-[100%] sm:w-[85%] md:w-[80%] aspect-video">
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

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Globe />
              <p className="text-muted break-all">BBLOG WORLD</p>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 md:mt-8">
          <Button
            variant="outline"
            onClick={handleEnter}
          >
            Enter
          </Button>
        </div>
      </div>
    </div>
  );
}
