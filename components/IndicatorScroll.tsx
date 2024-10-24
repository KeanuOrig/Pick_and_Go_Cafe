import Image from 'next/image'

interface ModelProps {
    clickedAngle: number | null;
}

export default function IndicatorScroll({ clickedAngle }: ModelProps) {

    return (
        <div 
            className={`text-overlay absolute left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-70 p-5 rounded-lg transition-opacity duration-500 ${clickedAngle === null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
            style={{ bottom: '20px' }}
        >
            <div className="flex flex-col items-center">
                <p className="mb-2">Scroll me</p>
                <Image 
                    src="/icons/scroll_arrow.svg" 
                    alt="Scroll Arrow" 
                    className="scroll-arrow animate-bounce mt-2" 
                    width={40} 
                    height={40} 
                    priority
                />
            </div>
        </div>
    )
}