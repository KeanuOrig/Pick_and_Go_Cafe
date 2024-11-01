import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three";

interface ModelProps {
    boxSize: number;
}

export default function BoxModel({ boxSize }: ModelProps) {
  /* const cubeRef = useRef<THREE.Mesh>(null!); */
  
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
            <meshStandardMaterial attach={`material-${index}`} map={texture} key={index} />
        ))}
    </mesh>
  );
}