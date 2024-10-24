import React from 'react';

interface ContentProps {
    angle: number;
    title: string;
    content: string[];
    position: React.CSSProperties;
}

interface OverlayContentProps {
    data: ContentProps[];
    clickedAngle: number | null;
    isMobile: boolean;
}

const OverlayContent: React.FC<OverlayContentProps> = ({ data, clickedAngle, isMobile }) => {
    return (
        <>
            {data.map(({ angle, title, content, position }) => (
                <div 
                    key={angle} 
                    className={`text-overlay absolute text-white bg-black bg-opacity-70 p-5 rounded-lg transition-opacity duration-500 ${clickedAngle === angle ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
                    style={!isMobile ? position : { 
                        top: '80%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        maxWidth: '400px',
                        textAlign: 'center'
                    }}
                >
                    <h1 className="font-serif text-2xl text-center mb-2 shadow-md tracking-wide px-2">{title}</h1>
                    {content.map((text, index) => (
                        <p key={index} className="text-justify">{text}</p>
                    ))}
                </div>
            ))}
        </>
    );
};

export default OverlayContent;
