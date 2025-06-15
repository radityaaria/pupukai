import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from 'react-icons/fa';

const labelMap = {
  kelompokTani: "Kelompok Tani",
  alamat: "Alamat",
  luasLahan: "Luas Lahan",
  jumlahAnggotaTani: "Jumlah Anggota Tani",
  produksiPanen: "Produksi Panen",
  pemanfaatan: "Pemanfaatan Bantuan",
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
  pemanfaatan: ['Pernah (tidak tepat guna)', 'Pernah (tepat guna)', 'Tidak pernah'],
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [editFormData, setEditFormData] = useState({});

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

  const handleEdit = (data) => {
    setSelectedData(data);
    const mapped = mapApiRow(data);
    setEditFormData(mapped);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`https://database-query.paso.dev/api/v1/c8bfefc8-ae85-456c-b5da-7ea4afccae33/dataTrain/${selectedData._id}`, editFormData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Data berhasil diperbarui");
      setShowEditModal(false);
      // Refresh data
      const response = await axios.get('https://database-query.paso.dev/api/v1/c8bfefc8-ae85-456c-b5da-7ea4afccae33/dataTrain', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDataTrain(response.data);
    } catch (err) {
      alert("Gagal memperbarui data");
    }
  };

  const handleInputChange = (field, value) => {
    // Convert numeric fields to numbers
    const numericFields = ['luasLahan', 'anggotaTani', 'hasilPanen', 'pemanfaatan', 'statusLahan', 'pendapatan', 'rekomendasi'];
    const convertedValue = numericFields.includes(field) ? parseInt(value) || 0 : value;
    
    setEditFormData(prev => ({
      ...prev,
      [field]: convertedValue
    }));
  };

  const handleDeleteHistory = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data riwayat ini?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://database-query.paso.dev/api/v1/c8bfefc8-ae85-456c-b5da-7ea4afccae33/history/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert("Data riwayat berhasil dihapus");
        setReports(prevData => prevData.filter(item => item._id !== id));
      } catch (err) {
        alert("Gagal menghapus data riwayat");
      }
    }
  };

  const mapApiRow = (row) => ({
    luasLahan: row.luasLahan,
    anggotaTani: row.anggotaTani,
    hasilPanen: row.hasilPanen,
    pemanfaatan: row.pemanfaatan,
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
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-7xl">
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
                      <th className="p-2 border">Aksi</th>
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
                        <td className="p-2 border text-center">
                          <button onClick={() => handleDeleteHistory(report._id)} className="text-red-500 hover:text-red-700">
                            <FaTrash />
                          </button>
                        </td>
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
                      {['luasLahan','anggotaTani','hasilPanen','pemanfaatan','statusLahan','pendapatan','rekomendasi','kelas'].map((key) => (
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
                          {['luasLahan','anggotaTani','hasilPanen','pemanfaatan','statusLahan','pendapatan','rekomendasi','kelas'].map((key) => (
                            <td key={key} className={key === 'kelas' ? `p-2 border text-center font-bold ${mapped[key] === 'Layak' ? 'bg-green-200 text-green-900' : mapped[key] === 'Tidak Layak' ? 'bg-red-200 text-red-900' : ''}` : 'p-2 border text-center'}>
                              {valueMap[key] ? valueMap[key][parseInt(mapped[key]) - 1] || mapped[key] : mapped[key]}
                            </td>
                          ))}
                          <td className="p-2 border text-center">
                            <div className="flex justify-center gap-2">
                              <button onClick={() => handleEdit(row)} className="text-blue-500 hover:text-blue-700">
                                <FaEdit />
                              </button>
                              <button onClick={() => handleDelete(row._id)} className="text-red-500 hover:text-red-700">
                                <FaTrash />
                              </button>
                            </div>
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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Data Training</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Luas Lahan</label>
                <select 
                  value={editFormData.luasLahan || ''} 
                  onChange={(e) => handleInputChange('luasLahan', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Luas Lahan</option>
                  <option value="1">&lt; 0.5 hektar</option>
                  <option value="2">0.5 - 1 hektar</option>
                  <option value="3">&gt; 1 hektar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jumlah Anggota Tani</label>
                <select 
                  value={editFormData.anggotaTani || ''} 
                  onChange={(e) => handleInputChange('anggotaTani', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Jumlah Anggota</option>
                  <option value="1">&lt; 10</option>
                  <option value="2">10 - 20</option>
                  <option value="3">&gt; 20</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Produksi Panen</label>
                <select 
                  value={editFormData.hasilPanen || ''} 
                  onChange={(e) => handleInputChange('hasilPanen', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Produksi Panen</option>
                  <option value="1">&lt; 1 ton</option>
                  <option value="2">1 - 2 ton</option>
                  <option value="3">&gt; 2 ton</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pemanfaatan Bantuan</label>
                <select 
                  value={editFormData.pemanfaatan || ''} 
                  onChange={(e) => handleInputChange('pemanfaatan', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Pemanfaatan Bantuan</option>
                  <option value="1">Pernah (tidak tepat guna)</option>
                  <option value="2">Pernah (tepat guna)</option>
                  <option value="3">Tidak pernah</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status Lahan</label>
                <select 
                  value={editFormData.statusLahan || ''} 
                  onChange={(e) => handleInputChange('statusLahan', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Status Lahan</option>
                  <option value="1">Milik sendiri</option>
                  <option value="2">Sewa</option>
                  <option value="3">Bagi hasil</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pendapatan Musim</label>
                <select 
                  value={editFormData.pendapatan || ''} 
                  onChange={(e) => handleInputChange('pendapatan', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Pendapatan</option>
                  <option value="1">&gt; 5 juta</option>
                  <option value="2">2 - 5 juta</option>
                  <option value="3">&lt; 2 juta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rekomendasi Penyuluh</label>
                <select 
                  value={editFormData.rekomendasi || ''} 
                  onChange={(e) => handleInputChange('rekomendasi', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Rekomendasi</option>
                  <option value="1">Tidak direkomendasikan</option>
                  <option value="2">Direkomendasikan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hasil Prediksi</label>
                <select 
                  value={editFormData.kelas || ''} 
                  onChange={(e) => handleInputChange('kelas', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Hasil Prediksi</option>
                  <option value="Layak">Layak</option>
                  <option value="Tidak Layak">Tidak Layak</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button 
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button 
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
