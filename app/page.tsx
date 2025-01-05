'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function EnterPage() {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleEnter = () => {
    setIsAnimating(true);
    setTimeout(() => {
      router.push('/main');
    }, 500);
  };

  return (
    // Changed background to white and removed the layout component for the enter page
    <div className={`min-h-screen flex flex-col items-center justify-center bg-white text-black
      ${isAnimating ? 'animate-fade-out' : 'animate-fade-in'}`}>
      
      {/* Logo Container - Responsive sizing */}
      <div className="w-[200px] md:w-[400px] aspect-[4/3] relative mb-8 bg-[#90EBA3] rounded-lg">
        {/* Circle element */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      w-[120px] h-[120px] md:w-[240px] md:h-[240px] 
                      border-2 border-black rounded-full" />
        
        {/* Text below circle */}
        <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                     text-sm md:text-base font-medium">
          bblog world
        </p>
      </div>

      {/* Enter button - styled as a minimal rectangle */}
      <button
        onClick={handleEnter}
        className="w-[80px] h-[24px] md:w-[100px] md:h-[30px] 
                 border border-black hover:bg-black hover:text-white 
                 transition-colors duration-300"
        aria-label="Enter site"
      />
    </div>
  );
}