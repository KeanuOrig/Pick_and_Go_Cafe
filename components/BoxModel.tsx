import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three";

interface ModelProps {
    boxSize: number;
}

export default function BoxModel({ boxSize }: ModelProps) {
    const cubeRef = useRef<THREE.Mesh>(null!);
  
    const textures = [
        useLoader(THREE.TextureLoader, "/images/face1.jpg"),
        useLoader(THREE.TextureLoader, "/images/face2.jpg"),
        useLoader(THREE.TextureLoader, "/images/face3.jpg"),
        useLoader(THREE.TextureLoader, "/images/face4.jpg"), // not used
        useLoader(THREE.TextureLoader, "/images/face5.jpg"), // not used
        useLoader(THREE.TextureLoader, "/images/face6.jpg"),
      ];

    useFrame(() => {
      if (cubeRef.current) {
        cubeRef.current.rotation.y += 0.001;
      }
    });
  
    return (
        <mesh ref={cubeRef}>
            <boxGeometry args={[boxSize, boxSize, boxSize]} />
            {textures.map((texture, index) => (
                <meshStandardMaterial attach={`material-${index}`} map={texture} key={index} />
            ))}
        </mesh>
    );
}