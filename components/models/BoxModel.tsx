import { Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three";
import Button from '@/components/Button';
import { useGoToScene } from "@/hooks/useGoToScene";

interface ModelProps {
    boxSize: number;
    isMobile: boolean;
}

export default function BoxModel({ boxSize, isMobile }: ModelProps) {
  /* const cubeRef = useRef<THREE.Mesh>(null!); */
  
  const goToScene = useGoToScene();
  const textures = useLoader(TextureLoader, [
    "/three/cube/face1.jpg",
    "/three/cube/face2.jpg",  
    "/three/cube/face3.jpg",
    "/three/cube/face4.jpg",
    "/three/cube/face5.jpg",
    "/three/cube/face6.jpg",
  ]);

  // remove performance issue
  /* useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.001;
    }
  }); */

  return (
    <mesh>
        <boxGeometry args={[boxSize, boxSize, boxSize]} />
        {textures.map((texture, index) => (
            <meshStandardMaterial
            attach={`material-${index}`}
            map={texture} 
            key={index} 
            />
        ))}
        
      <Html
        position={ isMobile ? [-boxSize / 10, boxSize * 6, boxSize * 10] : [1, -1.5, boxSize / 2.1]} // Position in front of the front face
        style={{ pointerEvents: 'auto' }}
      >
        <div  
          onClick={() => {goToScene('globeScene')}}
          className={`z-0 cursor-pointer transform transition-transform duration-300 hover:scale-110`} 
        >
        <Button message="View on Map 🌍"/>
        </div>
      </Html>   

    </mesh>
  );
}
