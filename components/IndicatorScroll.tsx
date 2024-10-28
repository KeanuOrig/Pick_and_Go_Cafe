import Image from 'next/image'
import { useIndicator } from '../context/IndicatorContext';

interface ModelProps {
    clickedAngle: number | null;
}

export default function IndicatorScroll({ clickedAngle }: ModelProps) {

    const { showIndicator, setShowIndicator } = useIndicator();
    
    const handleTapClick = () => {
        document.getElementById('detailScene')?.scrollIntoView({ behavior: 'smooth' });
        setShowIndicator(false);
    };
    
    return (
        <>
            {showIndicator && (clickedAngle === 0 || clickedAngle === 1) &&(
                <div 
                    className={`text-overlay absolute left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-70 p-5 rounded-lg transition-opacity duration-500 ${clickedAngle === 0 || clickedAngle === 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
                    style={{ bottom: '20px' }}
                >
                    <div className="flex flex-col items-center">
                        {clickedAngle === 0 && (
                            <>
                                <p className="mb-2">Scroll me</p>
                                <Image 
                                    src="/icons/scroll_arrow.svg" 
                                    alt="Scroll Arrow" 
                                    className="scroll-arrow animate-bounce mt-2" 
                                    width={40} 
                                    height={40} 
                                    priority
                                />
                            </>
                        )}
                        {clickedAngle === 1 && (
                            <>
                                <div onClick={handleTapClick}>
                                    <p className="mb-2 cursor-pointer">Tap me</p>
                                    <div className="text-center cursor-pointer">
                                        <Image 
                                            src="/icons/tap_arrow.svg" 
                                            alt="Tap Arrow" 
                                            className="tap-arrow animate-grow mt-2 mx-auto" 
                                            width={40} 
                                            height={40} 
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}