import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from 'react-icons/fa';

const labelMap = {
  kelompokTani: "Kelompok Tani",
  alamat: "Alamat",
  luasLahan: "Luas Lahan",
  jumlahAnggotaTani: "Jumlah Anggota Tani",
  produksiPanen: "Produksi Panen",
  pemanfaatanBantuan: "Pemanfaatan Bantuan",
  statusLahan: "Status Lahan",
  pendapatan: "Pendapatan Musim",
  rekomendasi: "Rekomendasi Penyuluh",
  kelas: "Hasil Prediksi",
  createdAt: "Waktu Prediksi"
};

const valueMap = {
  luasLahan: ['< 0.5 hektar', '0.5 - 1 hektar', '> 1 hektar'],
  jumlahAnggotaTani: ['< 10', '10 - 20', '> 20'],
  produksiPanen: ['< 1 ton', '1 - 2 ton', '> 2 ton'],
  pemanfaatanBantuan: ['Pernah (tidak tepat guna)', 'Pernah (tepat guna)', 'Tidak pernah'],
  statusLahan: ['Milik sendiri', 'Sewa', 'Bagi hasil'],
  pendapatan: ['> 5 juta', '2 - 5 juta', '< 2 juta'],
  rekomendasi: ['Tidak direkomendasikan', 'Direkomendasikan']
};

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [tab, setTab] = useState('riwayat');
  const [dataTrain, setDataTrain] = useState([]);
  const [loadingTrain, setLoadingTrain] = useState(false);
  const [errorTrain, setErrorTrain] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [errorHistory, setErrorHistory] = useState(null);

  useEffect(() => {
    if (tab === 'riwayat') {
      setLoadingHistory(true);
      const token = localStorage.getItem("token");
      axios.get('https://database-query.paso.dev/api/v1/c8bfefc8-ae85-456c-b5da-7ea4afccae33/history', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          setReports(res.data);
          setLoadingHistory(false);
        })
        .catch(err => {
          setErrorHistory('Gagal mengambil data riwayat');
          setLoadingHistory(false);
        });
    }
  }, [tab]);

  useEffect(() => {
    if (tab === 'dataTrain' && dataTrain.length === 0 && !loadingTrain) {
      setLoadingTrain(true);
      const token = localStorage.getItem("token");
      axios.get('https://database-query.paso.dev/api/v1/c8bfefc8-ae85-456c-b5da-7ea4afccae33/dataTrain', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          setDataTrain(res.data);
          setLoadingTrain(false);
        })
        .catch(err => {
          setErrorTrain('Gagal mengambil data training');
          setLoadingTrain(false);
        });
    }
  }, [tab]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://database-query.paso.dev/api/v1/c8bfefc8-ae85-456c-b5da-7ea4afccae33/dataTrain/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert("Data berhasil dihapus");
        setDataTrain(prevData => prevData.filter(item => item._id !== id));
      } catch (err) {
        alert("Gagal menghapus data");
      }
    }
  };

  const mapApiRow = (row) => ({
    luasLahan: row.luasLahan,
    jumlahAnggotaTani: row.anggotaTani,
    produksiPanen: row.hasilPanen,
    pemanfaatanBantuan: row.pemanfaatan,
    statusLahan: row.statusLahan,
    pendapatan: row.pendapatan,
    rekomendasi: row.rekomendasi,
    kelas: row.kelas
  });

  return (
    <div className="min-h-screen bg-slate-200">
      <div className="sticky top-0 z-10 bg-slate-200 py-4">
        <div className="flex gap-4 justify-center">
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 ${tab === 'riwayat' ? 'border-blue-600 text-blue-700 bg-blue-100' : 'border-transparent text-gray-500 bg-gray-100'}`}
            onClick={() => setTab('riwayat')}
          >
            Riwayat
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 ${tab === 'dataTrain' ? 'border-blue-600 text-blue-700 bg-blue-100' : 'border-transparent text-gray-500 bg-gray-100'}`}
            onClick={() => setTab('dataTrain')}
          >
            Data Train
          </button>
        </div>
      </div>
      <div className="p-10 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-5xl">
          <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Data Hasil Penentuan Penerima Bantuan Pupuk Organik</h1>
          {tab === 'riwayat' ? (
            loadingHistory ? (
              <div className="text-center text-gray-500 py-8">Memuat data riwayat...</div>
            ) : errorHistory ? (
              <div className="text-center text-red-500 py-8">{errorHistory}</div>
            ) : reports.length === 0 ? (
              <div className="text-center text-gray-500">Belum ada hasil yang tersimpan.</div>
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
                      <tr key={report._id} className="even:bg-slate-50">
                        <td className="p-2 border text-center">{idx + 1}</td>
                        {Object.keys(labelMap).map((key) => (
                          <td
                            key={key}
                            className={
                              key === 'kelas'
                                ? `p-2 border text-center font-bold ${report[key] === 'Layak' ? 'bg-green-200 text-green-900' : report[key] === 'Tidak Layak' ? 'bg-red-200 text-red-900' : ''}`
                                : 'p-2 border text-center'
                            }
                          >
                            {key === 'createdAt'
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
            )
          ) : (
            <div className="overflow-x-auto">
              {loadingTrain ? (
                <div className="text-center text-gray-500 py-8">Memuat data training...</div>
              ) : errorTrain ? (
                <div className="text-center text-red-500 py-8">{errorTrain}</div>
              ) : (
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="p-2 border">No</th>
                      {['luasLahan','jumlahAnggotaTani','produksiPanen','pemanfaatanBantuan','statusLahan','pendapatan','rekomendasi','kelas'].map((key) => (
                        <th key={key} className="p-2 border">{labelMap[key] || key}</th>
                      ))}
                      <th className="p-2 border">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTrain.map((row, idx) => {
                      const mapped = mapApiRow(row);
                      return (
                        <tr key={row._id} className="even:bg-slate-50">
                          <td className="p-2 border text-center">{idx + 1}</td>
                          {['luasLahan','jumlahAnggotaTani','produksiPanen','pemanfaatanBantuan','statusLahan','pendapatan','rekomendasi','kelas'].map((key) => (
                            <td key={key} className={key === 'kelas' ? `p-2 border text-center font-bold ${mapped[key] === 'Layak' ? 'bg-green-200 text-green-900' : mapped[key] === 'Tidak Layak' ? 'bg-red-200 text-red-900' : ''}` : 'p-2 border text-center'}>
                              {valueMap[key] ? valueMap[key][parseInt(mapped[key]) - 1] || mapped[key] : mapped[key]}
                            </td>
                          ))}
                          <td className="p-2 border text-center">
                            <button onClick={() => handleDelete(row._id)} className="text-red-500 hover:text-red-700">
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
