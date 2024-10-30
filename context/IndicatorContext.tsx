"use client"

import React, { createContext, useContext, useState } from 'react';

interface IndicatorContextType {
    showLandingIndicator: boolean;
    setShowLandingIndicator: React.Dispatch<React.SetStateAction<boolean>>;
    showDetailIndicator: string | null;
    setShowDetailIndicator: React.Dispatch<React.SetStateAction<string | null>>;
}

const IndicatorContext = createContext<IndicatorContextType | undefined>(undefined);

export const IndicatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [showLandingIndicator, setShowLandingIndicator] = useState<boolean>(true);
    const [showDetailIndicator, setShowDetailIndicator] = useState<string | null>(null);
    return (
        <IndicatorContext.Provider value={{ showLandingIndicator, setShowLandingIndicator, showDetailIndicator, setShowDetailIndicator }}>
            {children}
        </IndicatorContext.Provider>
    );
};

// Custom hook for using the context
export const useIndicator = (): IndicatorContextType => {
    const context = useContext(IndicatorContext);
    if (!context) {
        throw new Error("useLandingIndicator must be used within an IndicatorProvider");
    }
    return context;
};
