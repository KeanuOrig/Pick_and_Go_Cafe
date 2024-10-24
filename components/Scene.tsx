"use client"

import { Canvas } from "@react-three/fiber"
import { useProgress, Html, ScrollControls, OrbitControls } from "@react-three/drei"
import { useState, Suspense } from "react"
import Model from './Model'
import Image from 'next/image'
import { useWindowSize } from "@/hooks/useWindowSize"
import { LandingData } from "@/interface"

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress.toFixed(1)}%</Html>
}

export default function Scene() {

    const [clickedAngle, setClickedAngle] = useState<number | null>(null)
    const [data, setData] = useState<LandingData[]>([]);
    const { isMobile } = useWindowSize();

    fetch('/data/landing_scroll_data.json')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));

    return (
    <>
        <div  
            className={`absolute`} 
            style={{
                top: 0,
                left: 0,
                height: '10vw',
                width: '10vw',
            }}
        >
            <Image 
                src="/images/logo_transparent_v2.png" 
                alt="Scroll Arrow" 
                width={400} 
                height={400} 
                priority
        />
        </div>

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
                {! isMobile && <OrbitControls enableZoom={false} enablePan={false} />}
            </Suspense>
        </Canvas>

        {/* Text Divs for different angles */}
        
        {data.map(({ angle, title, content, position }) => (
            <div 
                key={angle} 
                className={`text-overlay absolute text-white bg-black bg-opacity-70 p-5 rounded-lg transition-opacity duration-500 ${clickedAngle === angle ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
                style={ ! isMobile ? position : { 
                    top: '80%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxWidth: '400px',
                    textAlign: 'center'
                }}
            >
                <h1 className="font-serif text-2xl text-center mb-2 shadow-md tracking-wide px-2">{title}</h1>
                {content.map((text, index) => (
                    <p key={index} className="text-justify">{text}</p>
                ))}
            </div>
        ))}

        {/* Scroll indication */}
        <div 
            className={`text-overlay absolute left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-70 p-5 rounded-lg transition-opacity duration-500 ${clickedAngle === null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
            style={{ bottom: '20px' }}
        >
            <div className="flex flex-col items-center">
                <p className="mb-2">Scroll me</p>
                <Image 
                    src="/icons/scroll_arrow.svg" 
                    alt="Scroll Arrow" 
                    className="scroll-arrow animate-bounce mt-2" 
                    width={40} 
                    height={40} 
                    priority
                />
            </div>
        </div>
    </>
    );
}
