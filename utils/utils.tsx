import { useIndicator } from '@/context/IndicatorContext';
import * as THREE from 'three';

/**
 * Computes the rotation for an object based on its coordinates.
 */
export const computeRotation = ([x, y, z]: [number, number, number]) => {
    const direction = new THREE.Vector3(x, y, z).normalize(); // Normalized direction from the center
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction); // Align upward vector with direction
  
    const euler = new THREE.Euler().setFromQuaternion(quaternion);
    return [euler.x, euler.y, euler.z];
}

/**
 * Convert Latitude and Longitude to xyz coordinates.
 */
export const convertLatLngToXYZ = (lat: number, lng: number, radius: number): [number, number, number] => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
  
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
  
    return [ x, y, z ];
}
