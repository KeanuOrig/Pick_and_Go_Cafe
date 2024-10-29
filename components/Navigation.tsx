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

  const goToLanding = (scene : string) => {
    
    switch (scene) {
      case 'landingScene':
        setShowLandingIndicator(true);
        setShowDetailIndicator(false);
        break;
      case 'detailScene':
        setShowDetailIndicator(true);
        setShowLandingIndicator(false);
        break;
      default:
        setShowLandingIndicator(false);
        setShowDetailIndicator(false);
        break;
    }
        
    document.getElementById(scene)?.scrollIntoView({ behavior: 'smooth' });
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
          <li className="py-1 hover:animate-growonce">
            <Navitem src="/icons/globe.svg"/>
          </li>
          <li onClick={() => {goToLanding('detailScene')}} className="py-1 hover:animate-growonce">
            <Navitem src="/icons/list.svg"/>
          </li>
          <li onClick={() => {goToLanding('landingScene')}} className="py-1 hover:animate-growonce">
            <Navitem src="/icons/refresh.svg"/>
          </li>
        </ul>
      </div>
)}
    </>
  );
}