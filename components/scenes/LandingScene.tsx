"use client"

import { Canvas } from "@react-three/fiber"
import { ScrollControls } from "@react-three/drei"
import { useState, Suspense, useEffect } from "react"
import CoffeeModel from '../models/CoffeeModel'
import OverlayContent from "../OverlayContent"
import LandingIndicator from '../LandingIndicator'
import { useWindowSize } from "@/hooks/useWindowSize"
import { LandingData } from "@/interface"
import Loader from '../Loader'

export default function LandingScene() {

    const [clickedAngle, setClickedAngle] = useState<number | null>(null)
    const [data, setData] = useState<LandingData[]>([]);
    const { isMobile } = useWindowSize();

    useEffect(() => {
        fetch('/data/landing_scroll_data.json')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

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
                    <CoffeeModel setClickedAngle={setClickedAngle}/>
                </ScrollControls>
                {/* {! isMobile && <OrbitControls enableZoom={false} enablePan={false} />} */}
            </Suspense>
        </Canvas>

        {/* Text Divs for different angles */}
        
        <OverlayContent 
            data={data} 
            clickedAngle={clickedAngle} 
            isMobile={isMobile} 
        />
        <LandingIndicator clickedAngle={clickedAngle}/>
    </>
    );
}
