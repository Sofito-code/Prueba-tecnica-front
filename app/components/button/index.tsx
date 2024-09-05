
export default function Button({ text, onClick}: { text: String, onClick: React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full" onClick={onClick}>
            {text}
        </button>
    )
}