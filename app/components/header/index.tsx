import Image from "next/image";

export default function Header() {
    return (
        <header className="bg-gray-100 shadow-md">
            <nav className="container mx-auto px-10 py-3 flex justify-between items-center">
                <div className="text-xl font-bold text-gray-800">
                    <Image src="/images/logo.png" alt="alt" width={60} height={60} />
                </div>
                <div className="flex space-x-4" >
                    <h1 className="text-gray-600 hover:text-gray-800 text-lg font-bold">Sistemas de Registro de Actividades</h1>
                </div>
            </nav>
        </header>
    );
}