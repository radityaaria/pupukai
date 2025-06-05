import React from "react";
import { IoIosLogIn } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-2xl font-bold tracking-widest">PUPUK AI</div>
      <ul className="flex space-x-4">
        <li>
          <a href="/" className="hover:text-gray-400">
            Home
          </a>
        </li>
        <li>
          <a href="/about" className="hover:text-gray-400">
            About
          </a>
        </li>
        <li>
          <a href="/pengembang" className="hover:text-gray-400">
            Pengembang
          </a>
        </li>
        <li>
          <a href="/petunjuk" className="hover:text-gray-400">
            Petunjuk Penggunaan
          </a>
        </li>
        <li>
          <a href="/simulasi" className="hover:text-gray-400">
            Simulasi Kelayakan Bantuan
          </a>
        </li>
      </ul>
      <a
        href="/login"
        className="flex items-center gap-2 bg-white text-black px-3 py-2 rounded hover:bg-slate-200 transition font-semibold"
        style={{ minWidth: 44 }}
      >
        <IoIosLogIn className="h-8 w-8 font-bold" />
      </a>
    </nav>
  );
};

export default Navbar;