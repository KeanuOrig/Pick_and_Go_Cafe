import { useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { PHILIPPINES_COORDINATES } from "@/constants/coordinates";
import { TextureLoader } from "three";
import { useState } from "react";
import { computeRotation, convertLatLngToXYZ } from "@/utils/utils";
import Link from 'next/link';
import Button from "../Button";

interface ModelProps {
  sphereScale: number;
}

export default function GlobeModel({ sphereScale }: ModelProps) {
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const earthTexture = useLoader(TextureLoader, "/three/earth_texture.jpg");
  const redFiberTexture = useLoader(TextureLoader, "/three/red_fiber_texture.jpg");

  const boholCoordinates = convertLatLngToXYZ(
    PHILIPPINES_COORDINATES.bohol.latitude, 
    PHILIPPINES_COORDINATES.bohol.longitude, 
    sphereScale
  );

  const boholRotation = computeRotation(boholCoordinates);

  const handleIconClick = () => {
    if (isModalOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <mesh>                   
      <sphereGeometry args={[sphereScale, 32, 32]} />
      <meshStandardMaterial /* wireframe={true}  */map={earthTexture} />

      {/* Axis,Gridm Wirefram Helpers for better 3D placement */}
      {/* add this to mesh material wireframe={true} */}
      {/* <axesHelper args={[10]} />
      <gridHelper args={[10, 20]} /> */}

      <mesh position={boholCoordinates} rotation={[boholRotation[0], boholRotation[1], boholRotation[2]]}>
          <cylinderGeometry args={[0.01, 0.01, 0.8, 16]} />
          <meshStandardMaterial map={redFiberTexture}/>
      </mesh>


      {/* <Html position={boholCoordinates}>
        <div style={{ color: 'black', fontSize: '1rem' }}>☕️</div>
      </Html> */}

      <Html 
        position={boholCoordinates} 
      >
        <div
          className="text-black text-lg cursor-pointer"
          onClick={handleIconClick}
        >
          ☕️
        </div>
        
        {/* Modal rendering */}
        {isModalOpen && (
          <div className={`fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 ${!isAnimating ? 'animate-fadeinexpand' : 'animate-fadeoutcollapse'}`}>
            <div className="bg-white bg-opacity-70 p-5 rounded shadow-lg relative relative">
              <span
                className="absolute top-2 right-5 cursor-pointer text-lg"
                onClick={handleIconClick}
                role="button"
                aria-label="Close modal"
              >
                ✖️
              </span>
              <span
                className="absolute top-2 left-5 cursor-pointer text-lg font-bold"
              >
                Pick & Go Cafe
              </span>
              {/* Google Map */}
              <iframe
                className="rounded-lg shadow-lg mt-6"
                src="https://www.google.com/maps/embed/v1/place?q=Bohol,+Philippines&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                allowFullScreen
                loading="lazy"
              ></iframe>

              <Link href="/coming-soon" className="flex justify-center items-center mt-4">
                <Button message="Explore Our Shop"/>
              </Link>
            </div>
          </div>
        )}
      </Html>
    </mesh>
  );
}
