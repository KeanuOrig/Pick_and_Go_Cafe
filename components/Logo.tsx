import Image from 'next/image'

export default function Logo() {

    return (
        <div  
        className={`absolute animate-fadeinbounceleft transform transition-transform duration-300 hover:scale-110`} 
        style={{
            top: '1%',
            left: '0.5%',
            height: '20vh',
            width: '20vh',
        }}
        >
        <Image 
            src="/images/logo_transparent_v2.png" 
            alt="Scroll Arrow" 
            width={400} 
            height={400} 
            priority
        />
        </div>
    )
}