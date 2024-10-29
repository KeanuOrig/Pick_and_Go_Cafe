import Image from 'next/image';

interface ModelProps {
    src: string;
}

export default function Navitem({ src }: ModelProps) {
    return (
        <Image 
        src={src} 
        className="mx-auto"
        alt="Nav Item" 
        width={30} 
        height={30} 
      />
    );

}