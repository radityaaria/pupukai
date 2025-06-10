import React, { useEffect, useState } from "react";

const labelMap = {
  kelompok_tani: "Kelompok Tani",
  alamat: "Alamat",
  luas_lahan: "Luas Lahan",
  anggota_tani: "Jumlah Anggota Tani",
  hasil_panen: "Produksi Panen",
  pemanfaatan: "Pemanfaatan Bantuan",
  status_lahan: "Status Lahan",
  pendapatan: "Pendapatan Musim",
  rekomendasi: "Rekomendasi Penyuluh",
  hasil: "Hasil Prediksi",
  waktu: "Waktu Prediksi"
};

const valueMap = {
  luas_lahan: ['< 0.5 hektar', '0.5 - 1 hektar', '> 1 hektar'],
  anggota_tani: ['< 10', '10 - 20', '> 20'],
  hasil_panen: ['< 1 ton', '1 - 2 ton', '> 2 ton'],
  pemanfaatan: ['Pernah (tidak tepat guna)', 'Pernah (tepat guna)', 'Tidak pernah'],
  status_lahan: ['Milik sendiri', 'Sewa', 'Bagi hasil'],
  pendapatan: ['> 5 juta', '2 - 5 juta', '< 2 juta'],
  rekomendasi: ['Tidak direkomendasikan', 'Direkomendasikan']
};

const Dashboard = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('allReports');
      if (data) setReports(JSON.parse(data));
    }
  }, []);

  return (
    <div className="min-h-screen p-10 flex items-center justify-center bg-slate-200">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-5xl">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Data Hasil Penentuan Penerima Bantuan Pupuk Organik</h1>
        {reports.length === 0 ? (
          <div className="text-center text-gray-500">Belum ada report prediksi yang tersimpan.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-2 border">No</th>
                  {Object.keys(labelMap).map((key) => (
                    <th key={key} className="p-2 border">{labelMap[key]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map((report, idx) => (
                  <tr key={idx} className="even:bg-slate-50">
                    <td className="p-2 border text-center">{idx + 1}</td>
                    {Object.keys(labelMap).map((key) => (
                      <td
                        key={key}
                        className={
                          key === 'hasil'
                            ? `p-2 border text-center font-bold ${report[key] === 'Layak' ? 'bg-green-200 text-green-900' : report[key] === 'Tidak Layak' ? 'bg-red-200 text-red-900' : ''}`
                            : 'p-2 border text-center'
                        }
                      >
                        {key === 'waktu'
                          ? new Date(report[key]).toLocaleString()
                          : valueMap[key]
                          ? valueMap[key][parseInt(report[key]) - 1] || report[key]
                          : report[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
