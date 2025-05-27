import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Simulasi = () => {
  const [kayu, setKayu] = useState("");
  const [paku, setPaku] = useState("");
  const [lem, setLem] = useState("");
  const [hasil, setHasil] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/register");
    }
  }, [router]);

  const gaussJordan = (matrix) => {
    const n = matrix.length;

    for (let i = 0; i < n; i++) {
      let maxEl = Math.abs(matrix[i][i]);
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(matrix[k][i]) > maxEl) {
          maxEl = Math.abs(matrix[k][i]);
          maxRow = k;
        }
      }

      for (let k = i; k < n + 1; k++) {
        let tmp = matrix[maxRow][k];
        matrix[maxRow][k] = matrix[i][k];
        matrix[i][k] = tmp;
      }

      let pivot = matrix[i][i];
      if (pivot === 0) {
        throw new Error("Tidak ada solusi unik.");
      }
      for (let k = i; k < n + 1; k++) {
        matrix[i][k] /= pivot;
      }

      for (let j = 0; j < n; j++) {
        if (j !== i) {
          let factor = matrix[j][i];
          for (let k = i; k < n + 1; k++) {
            matrix[j][k] -= factor * matrix[i][k];
          }
        }
      }
    }

    const solution = [];
    for (let i = 0; i < n; i++) {
      solution.push(matrix[i][n]);
    }
    return solution;
  };

  const hitungProduk = (totalKayu, totalPaku, totalLem) => {
    const matrix = [
      [2, 1, 1, totalKayu],
      [30, 20, 15, totalPaku],
      [3, 2, 1, totalLem],
    ];

    const [x, y, z] = gaussJordan(matrix);
    return {
      pintu: Math.round(x),
      jendela: Math.round(y),
      kusen: Math.round(z),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalKayu = parseFloat(kayu);
    const totalPaku = parseFloat(paku);
    const totalLem = parseFloat(lem);

    if (isNaN(totalKayu) || isNaN(totalPaku) || isNaN(totalLem)) {
      setHasil({
        error: "Semua input harus berupa angka yang valid.",
      });
      return;
    }

    try {
      const hasilPerhitungan = hitungProduk(totalKayu, totalPaku, totalLem);
      setHasil({
        pintu: hasilPerhitungan.pintu,
        jendela: hasilPerhitungan.jendela,
        kusen: hasilPerhitungan.kusen,
        totalKayu,
        totalPaku,
        totalLem,
      });
    } catch (error) {
      setHasil({
        error: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen p-10 flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Simulasi Perhitungan Produk
        </h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="kayu" className="block mb-1 font-semibold">
                Kayu (meter)
              </label>
              <input
                id="kayu"
                type="number"
                value={kayu}
                onChange={(e) => setKayu(e.target.value)}
                required
                placeholder="Masukkan jumlah kayu"
                className="w-full p-2 border border-gray-300 rounded bg-white"
                min="0"
                step="any"
              />
            </div>
            <div>
              <label htmlFor="paku" className="block mb-1 font-semibold">
                Paku (pcs)
              </label>
              <input
                id="paku"
                type="number"
                value={paku}
                onChange={(e) => setPaku(e.target.value)}
                required
                placeholder="Masukkan jumlah paku"
                className="w-full p-2 border border-gray-300 rounded bg-white"
                min="0"
                step="any"
              />
            </div>
            <div>
              <label htmlFor="lem" className="block mb-1 font-semibold">
                Lem (botol)
              </label>
              <input
                id="lem"
                type="number"
                value={lem}
                onChange={(e) => setLem(e.target.value)}
                required
                placeholder="Masukkan jumlah lem"
                className="w-full p-2 border border-gray-300 rounded bg-white"
                min="0"
                step="any"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
            >
              Hitung
            </button>
          </form>

          {/* Menampilkan hasil */}
          {hasil && (
            <div className="mt-6 p-4 bg-white rounded shadow">
              {hasil.error ? (
                <p className="text-red-500">{hasil.error}</p>
              ) : (
                <div>
                  <p className="mt-4 font-semibold text-xl">
                    Input Bahan Baku:
                  </p>
                  <p>Kayu: {hasil.totalKayu} meter</p>
                  <p>Paku: {hasil.totalPaku} pcs</p>
                  <p>Lem: {hasil.totalLem} botol</p>
                  <p className="text-xl font-semibold mt-4">
                    Hasil Perhitungan:
                  </p>
                  <p>Pintu: {hasil.pintu}</p>
                  <p>Jendela: {hasil.jendela}</p>
                  <p>Kusen: {hasil.kusen}</p>

                  {hasil.pintu < 0 || hasil.jendela < 0 || hasil.kusen < 0 ? (
                    <p className="text-red-500 mt-2">
                      *Hasil negatif menunjukkan ada jumlah bahan baku yang
                      kurang.
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Simulasi;
