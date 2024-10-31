interface ModelProps {
    message: string;
}

export default function Button({ message }: ModelProps) {
    return (
        <button className="block w-40 bg-green-700 mx-auto hover:bg-green-500 text-white font-bold p-0.5 rounded tracking-wide cormorant-garamond !italic">
        <div className="border border-white py-4">
            {message}
        </div>
      </button>
    );

}