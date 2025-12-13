import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoIosLogIn } from "react-icons/io";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      router.push("/dashboard");
    } else {
      setIsLoggedIn(false);
    }

    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setIsLoggedIn(!!newToken);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-2xl font-bold tracking-widest">TilangExpert</div>
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
          <a href="/pelanggaran" className="hover:text-gray-400">
            Identifikasi Pelanggaran
          </a>
        </li>
        {/* <li>
          <a href="/dokumentasi" className="hover:text-gray-400">
            Dokumentasi & Wawancara
          </a>
        </li> */}
      </ul>
      {!isLoggedIn && (
        <a
          href="/login"
          className="flex items-center gap-2 bg-white text-black px-3 py-2 rounded hover:bg-slate-200 transition font-semibold"
          style={{ minWidth: 44 }}
        >
          <span className="text-sm">Login</span>
          <IoIosLogIn className="h-5 w-5 font-bold" />
        </a>
      )}
    </nav>
  );
};

export default Navbar;
