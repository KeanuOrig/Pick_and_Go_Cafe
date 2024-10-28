"use client"

import Image from 'next/image';
import { useIndicator } from '../context/IndicatorContext';

export default function Navigation() {

  const { showIndicator, setShowIndicator } = useIndicator();

  const handleTapClick = () => {
    document.getElementById('landingScene')?.scrollIntoView({ behavior: 'smooth' });
    setShowIndicator(true)
  };

  return (
    <div               
      className="z-10 back-to-top fixed bottom-5 right-5 p-3 bg-slate-500 text-white rounded-full shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-110"
      aria-label="Back to top"
      onClick={handleTapClick}
    >
      <Image 
          src="/icons/coffee-pot.gif" 
          alt="Back to Top" 
          width={30} 
          height={30} 
      />
    </div>
  );
}