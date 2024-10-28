"use client"

import { Canvas } from "@react-three/fiber"
import { useProgress, Html, ScrollControls, OrbitControls } from "@react-three/drei"
import { useState, Suspense, useEffect } from "react"
import CoffeeModel from './CoffeeModel'
import OverlayContent from "./OverlayContent"
import IndicatorScroll from './IndicatorScroll'
import { useWindowSize } from "@/hooks/useWindowSize"
import { LandingData } from "@/interface"
import styles from '../app/styles/Loader.module.css';

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
        <div className="flex flex-col items-center">
            <div className={styles.loaderSpinner}></div>
            <p className="text-white text-xl mt-2">{progress.toFixed(1)}%</p>
        </div>
    </Html>
  );
}

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
        <IndicatorScroll clickedAngle={clickedAngle}/>
    </>
    );
}
