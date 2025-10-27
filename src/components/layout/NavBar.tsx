import { Link } from "react-router-dom";
import Logo from "../../assets/agio.png";

export const Navbar = () => {

  return (
    <nav className="w-full flex justify-between bg-[#fffefe] p-8 border-b-2 border-gray-300 shadow-md">
        {/* Saudação e logo */}
        <h1 className="flex items-center text-[#222] text-4xl font-semibold w-1/3">
          <img src={Logo} alt="Logo" className="ml-2 w-10" />
        </h1>

        {/* Lista de links */}
        <ul className="flex list-none items-center space-x-10">
          <li>
            <Link
              to="/"
              className="text-[#060606] font-bold hover:underline focus:underline text-lg"
            >
              Estabelecimento
            </Link>
          </li>
          <li>
            <Link
              to="/eventos"
              className="text-[#060606] font-bold hover:underline focus:underline text-lg"
            >
              Produtos
            </Link>
          </li>
          <li>
            <Link
              to="/valor-combustivel"
              className="text-[#060606] font-bold hover:underline focus:underline text-lg"
            >
              Valor Combustível
            </Link>
          </li>
          <li>
            <Link
              to="/codigo-de-barras"
              className="text-[#060606] font-bold hover:underline focus:underline text-lg"
            >
              Codigo de Barras
            </Link>
          </li>
        </ul>
    </nav>
  );
};
