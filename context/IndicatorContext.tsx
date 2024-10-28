"use client"

import React, { createContext, useContext, useState } from 'react';

interface IndicatorContextType {
    showIndicator: boolean;
    setShowIndicator: React.Dispatch<React.SetStateAction<boolean>>;
}

const IndicatorContext = createContext<IndicatorContextType | undefined>(undefined);

export const IndicatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [showIndicator, setShowIndicator] = useState<boolean>(true);

    return (
        <IndicatorContext.Provider value={{ showIndicator, setShowIndicator }}>
            {children}
        </IndicatorContext.Provider>
    );
};

// Custom hook for using the context
export const useIndicator = (): IndicatorContextType => {
    const context = useContext(IndicatorContext);
    if (!context) {
        throw new Error("useIndicator must be used within an IndicatorProvider");
    }
    return context;
};
