'use client';

import { useState } from 'react';

const bobotKriteria = {
  luas_lahan: 5,
  anggota_tani: 2,
  hasil_panen: 3,
  pemanfaatan: 4,
  status_lahan: 3,
  pendapatan: 3,
  rekomendasi: 2
};

const dataset = [
  {
    luas_lahan: 3,
    anggota_tani: 2,
    hasil_panen: 3,
    pemanfaatan: 3,
    status_lahan: 3,
    pendapatan: 3,
    rekomendasi: 2,
    kelas: "Layak"
  },
  {
    luas_lahan: 1,
    anggota_tani: 1,
    hasil_panen: 1,
    pemanfaatan: 3,
    status_lahan: 2,
    pendapatan: 1,
    rekomendasi: 1,
    kelas: "Tidak Layak"
  },
  {
    luas_lahan: 3,
    anggota_tani: 1,
    hasil_panen: 3,
    pemanfaatan: 1,
    status_lahan: 1,
    pendapatan: 1,
    rekomendasi: 1,
    kelas: "Tidak Layak"
  },
  {
    luas_lahan: 3,
    anggota_tani: 2,
    hasil_panen: 2,
    pemanfaatan: 2,
    status_lahan: 2,
    pendapatan: 2,
    rekomendasi: 2,
    kelas: "Layak"
  },
  {
    luas_lahan: 2,
    anggota_tani: 2,
    hasil_panen: 3,
    pemanfaatan: 2,
    status_lahan: 1,
    pendapatan: 2,
    rekomendasi: 2,
    kelas: "Tidak Layak"
  }
];

function hitungJarak(data1, data2) {
  let jarak = 0;
  for (let kriteria in bobotKriteria) {
    const selisih = data1[kriteria] - data2[kriteria];
    jarak += Math.pow(selisih, 2) * bobotKriteria[kriteria];
  }
  return Math.sqrt(jarak);
}

function prediksiKNN(inputData, k = 3) {
  const jarakSemua = dataset.map(data => {
    return { jarak: hitungJarak(inputData, data), kelas: data.kelas };
  });
  jarakSemua.sort((a, b) => a.jarak - b.jarak);
  const tetangga = jarakSemua.slice(0, k);
  const count = {};
  tetangga.forEach(t => {
    count[t.kelas] = (count[t.kelas] || 0) + 1;
  });
  return {
    hasil: Object.entries(count).sort((a, b) => b[1] - a[1])[0][0],
    detail: tetangga
  };
}

export default function PrediksiPupuk() {
  const [formData, setFormData] = useState({
    luas_lahan: '1',
    anggota_tani: '1',
    hasil_panen: '1',
    pemanfaatan: '1',
    status_lahan: '1',
    pendapatan: '1',
    rekomendasi: '1'
  });
  const [hasilPrediksi, setHasilPrediksi] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = Object.fromEntries(Object.entries(formData).map(([k, v]) => [k, parseInt(v)]));
    const { hasil, detail } = prediksiKNN(input);
    setHasilPrediksi({ hasil, detail });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Prediksi Kelayakan Bantuan Pupuk</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'luas_lahan', label: 'Luas Lahan', options: ['< 0.5 hektar', '0.5 - 1 hektar', '> 1 hektar'] },
            { name: 'anggota_tani', label: 'Jumlah Anggota Tani', options: ['< 10', '10 - 20', '> 20'] },
            { name: 'hasil_panen', label: 'Produksi Panen', options: ['< 1 ton', '1 - 2 ton', '> 2 ton'] },
            { name: 'pemanfaatan', label: 'Pemanfaatan Bantuan', options: ['Pernah (tidak tepat guna)', 'Pernah (tepat guna)', 'Tidak pernah'] },
            { name: 'status_lahan', label: 'Status Lahan', options: ['Milik sendiri', 'Sewa', 'Bagi hasil'] },
            { name: 'pendapatan', label: 'Pendapatan Musim', options: ['> 5 juta', '2 - 5 juta', '< 2 juta'] },
            { name: 'rekomendasi', label: 'Rekomendasi Penyuluh', options: ['Tidak direkomendasikan', 'Direkomendasikan'] },
          ].map(({ name, label, options }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <select
                name={name}
                id={name}
                value={formData[name]}
                onChange={handleChange}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              >
                {options.map((opt, idx) => (
                  <option key={idx} value={idx + 1}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-4"
          >
            Prediksi Sekarang
          </button>
        </form>

        {hasilPrediksi && (
          <div className={`mt-6 text-center p-4 rounded-lg font-semibold ${hasilPrediksi.hasil === 'Layak' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            Hasil Prediksi: {hasilPrediksi.hasil}
          </div>
        )}
      </div>
    </main>
  );
}
