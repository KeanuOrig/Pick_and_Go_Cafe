import { useLoader } from "@react-three/fiber";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Html } from "@react-three/drei";
import { PHILIPPINES_COORDINATES } from "@/constants/coordinates";
import { Euler, Quaternion, TextureLoader, Vector3 } from "three";
import { useState } from "react";
import Link from 'next/link';
import Button from "../Button";

export default function GlobeModel() {
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { isMobile } = useWindowSize();

  const earthTexture = useLoader(TextureLoader, "/three/earth_texture.jpg");
  const redFiberTexture = useLoader(TextureLoader, "/three/red_fiber_texture.jpg");

  const size = isMobile ? 1.5 : 2.2;

  const boholCoordinates = convertLatLngToXYZ(
    PHILIPPINES_COORDINATES.bohol.latitude, 
    PHILIPPINES_COORDINATES.bohol.longitude, 
    size
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
      <sphereGeometry args={[size, 32, 32]} />
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

const convertLatLngToXYZ = (lat: number, lng: number, radius: number): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return [ x, y, z ];
}

// Compute rotation to keep the flag aligned outward from the globe center
const computeRotation = ([x, y, z]: [number, number, number]) => {
  const direction = new Vector3(x, y, z).normalize(); // Normalized direction from the center
  const quaternion = new Quaternion();
  quaternion.setFromUnitVectors(new Vector3(0, 1, 0), direction); // Align upward vector with direction

  const euler = new Euler().setFromQuaternion(quaternion);
  return [euler.x, euler.y, euler.z];
}
