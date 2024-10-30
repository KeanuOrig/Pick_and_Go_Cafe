"use client"

import { useIndicator } from '../context/IndicatorContext';
import { useState } from 'react';
import Navitem from './Navitem';

export default function Navigation() {

  const { setShowLandingIndicator, setShowDetailIndicator} = useIndicator();
  const [showDropdown, setShowDropdown] = useState(false);
  const [closing, setClosing] = useState(false);
  
  const handleTapClick = () => {
    if (showDropdown) {
      setClosing(true);
      setTimeout(() => {
        setShowDropdown(false);
        setClosing(false);
      }, 500); // Match this timeout with the animation duration
    } else {
      setShowDropdown(true);
    }
  };

  const setIndicatorTimer = (duration: number | undefined) => {
    const timer = setTimeout(() => {
      setShowDetailIndicator(null);
    }, duration);
  
    // Clean up the timer when the component unmounts or when the scene changes
    return () => clearTimeout(timer);
  };

  const goToScene = (scene: string) => {
    
    // let behavior: "auto" | "instant" | "smooth" = "smooth";
    document.getElementById(scene)?.scrollIntoView({ behavior: "smooth" });

    switch (scene) {
      case 'landingScene':
        setShowLandingIndicator(true);
        setShowDetailIndicator(null);
        break;

      case 'detailScene':
        setShowDetailIndicator('detail');
        setShowLandingIndicator(false);
        return setIndicatorTimer(4000);

      case 'globeScene':
        setShowDetailIndicator('globe');
        setShowLandingIndicator(false);
        return setIndicatorTimer(4000);

      default:
        setShowLandingIndicator(false);
        setShowDetailIndicator(null);
        break;
    }
  }
  
  return (
    <>
    <div               
      className={`z-10 back-to-top fixed bottom-5 right-5 p-3 bg-slate-300 text-white rounded-full shadow-lg cursor-pointer`}
      aria-label="Back to top"
      onClick={handleTapClick}
    >
      <div> 
      <Navitem src="/icons/coffee-pot.gif"/>
    </div>
      
    </div>
    {showDropdown && (
    <div               
      className={`z-10 back-to-top fixed bottom-20 right-5 p-3 bg-slate-300 text-white rounded-full shadow-lg cursor-pointer ${closing ? 'animate-fadeoutbouncedown' : 'animate-fadeinbounceup'}`}
      aria-label="Back to top"
      onClick={handleTapClick}
    >
        <ul className="text-sm text-white" aria-labelledby="doubleDropdownButton">
          <li onClick={() => {goToScene('landingScene')}} className="py-1 hover:animate-growonce">
            <Navitem src="/icons/refresh.svg"/>
          </li>
          <li onClick={() => {goToScene('detailScene')}} className="py-1 hover:animate-growonce">
            <Navitem src="/icons/list.svg"/>
          </li>
          <li onClick={() => {goToScene('globeScene')}} className="py-1 hover:animate-growonce">
            <Navitem src="/icons/globe.svg"/>
          </li>
        </ul>
      </div>
    )}
    </>
  );
}
