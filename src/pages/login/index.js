import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://database-query.paso.dev/api/v1/c8bfefc8-ae85-456c-b5da-7ea4afccae33/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard");
      } else {
        alert("Email atau password salah!");
      }
    } catch (error) {
      alert("Email atau password salah!");
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
        <h1 className="text-2xl font-bold mb-4 text-center">
          Silahkan Login
        </h1>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
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
                className="w-full p-2 border border-gray-300 mb-2 rounded bg-white"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 font-bold"
        >
          Masuk
        </button>
      </form>
    </div>
  );
};

export default Login;
