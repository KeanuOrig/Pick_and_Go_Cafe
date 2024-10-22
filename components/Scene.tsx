// Scene.tsx

"use client"

import { Canvas } from "@react-three/fiber"
import { useProgress, Html, ScrollControls, OrbitControls } from "@react-three/drei"
import { useState, Suspense } from "react"
import Model from './Model'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress.toFixed(1)}%</Html>
}

export default function Scene() {

    const [clickedAngle, setClickedAngle] = useState<number | null>(null)

    return (
    <>
        <Canvas 
            gl={{ antialias: true }} 
            dpr={[1, 1.5]} 
            camera={{ position: [1, 0.5, 1.5], fov: 25 }} 
            className="relative h-svh"
        >
            <directionalLight position={[5, 5, 5]} intensity={10} />
            <directionalLight position={[-5, -5, -5]} intensity={3} />
            <Suspense fallback={<Loader />}>
                <ScrollControls damping={0.3} pages={4}>
                    <Model setClickedAngle={setClickedAngle} />
                </ScrollControls>
                <OrbitControls enableZoom={false} />
            </Suspense>
        </Canvas>

        {/* Text Divs for different angles */}
        {[
            { angle: 90, title: 'Signature Coffees', content: ['Indulge in our expertly crafted coffee selections.', 'From rich espresso to velvety lattes, we have it all.', 'Every cup is brewed with love and care!'], position: { left: '5%', top: '10%' } },
            { angle: 180, title: 'Refreshing Teas', content: ['Try our assortment of fresh teas, brewed to perfection.', 'From classic black tea to herbal infusions, enjoy a relaxing moment.'], position: { right: '5%', top: '10%' } },
            { angle: 270, title: 'Specialty Drinks', content: ['Quench your thirst with our handcrafted specialty drinks.', 'Cold brew, iced teas, and more – perfect for any occasion!'], position: { left: '5%', top: '60%' } },
            { angle: 360, title: 'Pastries & Snacks', content: ['Pair your drink with one of our freshly baked pastries.', 'From croissants to cookies, we\'ve got your snack cravings covered!'], position: { right: '5%', top: '60%' } },
        ].map(({ angle, title, content, position }) => (
            <div 
                key={angle} 
                className={`text-overlay absolute text-white bg-black bg-opacity-70 p-5 rounded-lg transition-opacity duration-500 ${clickedAngle === angle ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
                style={position}
            >
                <h2 className="font-serif text-2xl text-center mb-2 shadow-md tracking-wide px-2">{title}</h2>
                {content.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
            </div>
        ))}

        {/* Scroll indication */}
        <div 
            className={`text-overlay absolute left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-70 p-5 rounded-lg transition-opacity duration-500 ${clickedAngle === null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
            style={{ bottom: '20px' }}
        >
            <div className="flex flex-col items-center">
                <img src="/icons/scroll_arrow.svg" alt="Scroll Arrow" className="scroll-arrow animate-bounce w-10 h-10 mt-2" />
            </div>
        </div>
    </>
    );
}
