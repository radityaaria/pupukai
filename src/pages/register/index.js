import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../../../libs/supabaseClient";

const Register = () => {
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Set default role to "user"

  const router = useRouter(); // Inisialisasi useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from("users").insert([
        {
          nama: nama,
          umur: umur,
          pekerjaan: pekerjaan,
          alamat: alamat,
          email: email,
          password: password, // In a real application, you should hash the password before sending it to the database
          role: role,
        },
      ]);

      if (error) {
        throw error;
      }

      alert("Pendaftaran berhasil!");
      router.push("/pelanggaran"); // Redirect to home page after successful registration
    } catch (error) {
      alert("Terjadi kesalahan saat pendaftaran: " + error.message);
    }
  };

  return (
    <div
      style={{ padding: "16px" }}
      className="min-h-screen bg-slate-200 flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl transform hover:scale-[1.01] transition-transform duration-300"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Registration Form
        </h1>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="nama" className="block mb-1">
                Nama
              </label>
              <input
                type="text"
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded bg-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded bg-white"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded bg-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="umur" className="block mb-1">
                Umur
              </label>
              <input
                type="number"
                id="umur"
                value={umur}
                onChange={(e) => setUmur(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded bg-white"
              />
            </div>
            <div>
              <label htmlFor="pekerjaan" className="block mb-1">
                Pekerjaan
              </label>
              <input
                type="text"
                id="pekerjaan"
                value={pekerjaan}
                onChange={(e) => setPekerjaan(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded bg-white"
              />
            </div>
          </div>
          <div>
            <label htmlFor="alamat" className="block mb-1">
              Alamat
            </label>
            <textarea
              id="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded bg-white"
              rows="3"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 font-bold"
        >
          Register
        </button>
        <p className="text-center mt-4 text-gray-600">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-700 hover:underline font-semibold"
          >
            Silahkan login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
