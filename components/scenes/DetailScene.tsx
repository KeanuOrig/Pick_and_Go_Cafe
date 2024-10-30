"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BoxModel from '../models/BoxModel';
import useBoxSize from "@/hooks/useBoxSize";

export default function DetailScene() {

    const boxSize = useBoxSize();
      
    return (
        <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} className="relative h-svh">
            <ambientLight intensity={1.5} />
            <BoxModel boxSize={boxSize} />
            <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                maxPolarAngle={Math.PI / 2} // Limits vertical rotation
                minPolarAngle={Math.PI / 2} // Prevents vertical rotation
            />
        </Canvas>
    );
}
