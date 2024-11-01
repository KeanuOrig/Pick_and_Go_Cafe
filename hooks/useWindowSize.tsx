import { useState, useEffect } from "react";

export const useWindowSize = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;

    return { width, isMobile };
}