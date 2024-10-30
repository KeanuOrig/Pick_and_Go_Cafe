import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useAnimations, useGLTF } from "@react-three/drei";
import { FLAG_PROPERTIES, PHILIPPINES_COORDINATES } from "@/constants/coordinates";

useGLTF.preload("/three/flag_animation.glb")

export default function GlobeModel() {

  const { isMobile } = useWindowSize();
  const flagRef = useRef();

  const earthTexture = useLoader(THREE.TextureLoader, "/three/earth_texture.jpg");
  const { animations, scene } = useGLTF("/three/flag_animation.glb");
  const { actions } = useAnimations(animations, scene)


  const size = isMobile ? 1.5 : 2.2;

  const boholCoordinates = convertLatLngToXYZ(
    PHILIPPINES_COORDINATES.bohol.latitude + FLAG_PROPERTIES.offset[0], 
    PHILIPPINES_COORDINATES.bohol.longitude  + FLAG_PROPERTIES.offset[1], 
    size + FLAG_PROPERTIES.offset[2]
  );

  const boholRotation = computeRotation(boholCoordinates);

  useFrame(() => {
    if (actions && actions["Object_0"]) {
      actions["Object_0"].play();
    }
  });

  return (
    <mesh>                   
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={earthTexture} />

      <primitive
        ref={flagRef}
        object={scene}
        scale={FLAG_PROPERTIES.scale}
        position={boholCoordinates} 
        rotation={boholRotation} 
      />

      {/* Axis,Gridm Wirefram Helpers for better 3D placement */}
      {/* add this to mesh material wireframe={true} */}
      {/* <axesHelper args={[10]} />
      <gridHelper args={[10, 20]} /> */}

      {/* Text Pin Marker, This is optional, I'll think about it */}
      {/* <mesh position={boholCoordinates}>
        <Html position={[0,0,0]}> 
          <div style={{ color: 'black', fontSize: '1rem' }}>Cafe</div>
        </Html>
      </mesh> */}
    </mesh>
  );
}

function convertLatLngToXYZ(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return [ x, y, z ];
}

// Compute rotation to keep the flag aligned outward from the globe center
function computeRotation([x, y, z]: [number, number, number]) {
  const direction = new THREE.Vector3(x, y, z).normalize(); // Normalized direction from the center
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction); // Align upward vector with direction

  const euler = new THREE.Euler().setFromQuaternion(quaternion);
  return [euler.x, euler.y, euler.z];
}