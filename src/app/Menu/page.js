export default function Menu() {
    return (
        <nav className="bg-gray-800 w-full p-4 shadow-lg">
            <ul className="flex justify-center space-x-8">
            <li>
                <a href="/" className="text-white text-lg hover:text-gray-300 transition-colors duration-200">
                Home
                </a>
            </li>
            <li>
                <a href="/movie" className="text-white text-lg hover:text-gray-300 transition-colors duration-200">
                Movie </a>
            </li>
            <li>
                <a href="/series" className="text-white text-lg hover:text-gray-300 transition-colors duration-200">
                Series </a>
            </li>
            <li>
                <a href='/search' className="text-white text-lg hover:text-gray-300 transition-colors duration-200">Buscar</a>
            </li>
            </ul>
        </nav>
        );
}