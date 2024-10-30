import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

useGLTF.preload("/three/coffee_grinder.glb")

interface ModelProps {
    setClickedAngle: (angle: number | null) => void;
}

export default function CoffeeModel({ setClickedAngle }: ModelProps) {
    const group = useRef<Group>(null)
    const { animations, scene } = useGLTF("/three/coffee_grinder.glb")
    const { actions } = useAnimations(animations, scene)
    const scroll = useScroll()

    useEffect(() => {
        if (actions["workflow"]) {
        actions["workflow"].play().paused = true; // Pause the animation initially
        }
    }, [actions]);

    useFrame(() => {
        if (actions["workflow"]) {
        const workflowAction = actions["workflow"];
        const duration = workflowAction.getClip().duration;

        // Update animation time based on scroll
        workflowAction.time = (duration * scroll.offset) / 1;

        // Determine current angle based on animation time
        const currentAngle = (workflowAction.time / duration) * 360;
        updateClickedAngle(currentAngle);
        }
    });

    const updateClickedAngle = (currentAngle: number) => {
        if (currentAngle >= 60 && currentAngle < 150) {
        setClickedAngle(90);
        } else if (currentAngle >= 120 && currentAngle < 210) {
        setClickedAngle(180);
        } else if (currentAngle >= 210 && currentAngle < 300) {
        setClickedAngle(270);
        } else if (currentAngle >= 300 && currentAngle <= 350) {
        setClickedAngle(360);
        } else if (currentAngle < 60) {
        setClickedAngle(0);
        } else if (currentAngle > 350) {
        setClickedAngle(1);
        } else {
        setClickedAngle(null); // Reset if not in specified range
        }
    };

    return (
        <group ref={group}>
            <primitive object={scene} />
        </group>
        
    );
}
