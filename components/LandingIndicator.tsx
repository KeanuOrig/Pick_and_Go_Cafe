import Image from 'next/image'
import { useIndicator } from '../context/IndicatorContext';

interface ModelProps {
    clickedAngle: number | null;
}

export default function LandingIndicator({ clickedAngle }: ModelProps) {

    const { 
        showLandingIndicator, 
        setShowLandingIndicator,
        showDetailIndicator,
        setShowDetailIndicator
    } = useIndicator();

    const handleTapClick = () => {
        document.getElementById('detailScene')?.scrollIntoView({ behavior: 'smooth' });
        setShowLandingIndicator(false);
        setShowDetailIndicator('detail');
        const timer = setTimeout(() => {
            setShowDetailIndicator(null);
          }, 4000);
        
          return () => clearTimeout(timer);
    };
    
    return (
        <>
            {showLandingIndicator && (clickedAngle === 0 || clickedAngle === 1) &&(
                <div 
                    className={`z-10 text-overlay absolute left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-70 p-5 rounded-lg transition-opacity duration-500 ${clickedAngle === 0 || clickedAngle === 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
                    style={{ bottom: '20px' }}
                >
                    <div className="flex flex-col items-center">
                        {clickedAngle === 0 && (
                            <div>
                                <p className="mb-2">Scroll me</p>
                                <Image 
                                    src="/icons/scroll_arrow.svg" 
                                    alt="Scroll Arrow" 
                                    className="scroll-arrow animate-bounce mt-2 mx-auto" 
                                    width={40} 
                                    height={40} 
                                    priority
                                />
                            </div>
                        )}
                        {clickedAngle === 1 && (
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
                        )}
                    </div>
                </div>
            )}
            {showDetailIndicator === 'detail' &&(
                <div 
                    className={`z-10 text-overlay absolute left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-70 p-5 rounded-lg transition-opacity duration-500`} 
                    style={{ bottom: '20px' }}
                >
                    <div className="flex flex-col items-center">
                        <div>
                            <p className="mb-2">Swipe me</p>
                            <Image 
                                src="/icons/arrow-right.svg" 
                                alt="Scroll Arrow" 
                                className="z-101 scroll-arrow animate-wiggle mt-2 mx-auto" 
                                width={40} 
                                height={40} 
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}
            {showDetailIndicator === 'globe' &&(
                <div 
                    className={`z-10 text-overlay absolute left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-70 p-5 rounded-lg transition-opacity duration-500`} 
                    style={{ bottom: '20px' }}
                >
                    <div className="flex flex-col items-center">
                        <div>
                            <p className="mb-2">Rotate me</p>
                            <Image 
                                src="/icons/rotate.svg" 
                                alt="Scroll Arrow" 
                                className="z-101 scroll-arrow animate-wiggle mt-2 mx-auto" 
                                width={40} 
                                height={40} 
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}