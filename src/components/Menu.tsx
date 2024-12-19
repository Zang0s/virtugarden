export default function Menu() {
    return (
      <nav className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold"><a href="./">VirtuGarden</a></div>
  
          {/* Menu Links */}
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-blue-400 transition">Strona główna</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">Oferta</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">Kontakt</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">O nas</a>
            </li>
            <li>
              <a href="/koszyk" className="hover:text-blue-400 transition">Koszyk</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  