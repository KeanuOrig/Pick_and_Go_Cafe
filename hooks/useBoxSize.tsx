import { useState, useEffect } from 'react';

export const useBoxSize = (divisor: number = 200) => {
    const [boxSize, setBoxSize] = useState(3.50);

    const updateBoxSize = () => {
        const newSize = Math.min(window.innerWidth, window.innerHeight) / divisor;
        setBoxSize(newSize);
    };

    useEffect(() => {
        updateBoxSize();
        window.addEventListener('resize', updateBoxSize);
        return () => window.removeEventListener('resize', updateBoxSize);
    }, [divisor]);

    return boxSize;
};
