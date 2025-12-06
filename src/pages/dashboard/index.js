import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { supabase } from "~/libs/supabaseClient";

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
  createdAt: "Waktu Prediksi",
  if_luasLahan: "Jika Luas Lahan",
  if_jumlahAnggotaTani: "Jika Jumlah Anggota Tani",
  if_produksiPanen: "Jika Produksi Panen",
  if_pemanfaatanBantuan: "Jika Pemanfaatan Bantuan",
  if_statusLahan: "Jika Status Lahan",
  if_pendapatan: "Jika Pendapatan Musim",
  if_rekomendasi: "Jika Rekomendasi Penyuluh",
  then_kelas: "Maka Hasil Prediksi",
  kode_rule: "Kode Rule",
  cf_pakar: "Cf Pakar",
};

const valueMap = {
  luasLahan: ["< 0.5 hektar", "0.5 - 1 hektar", "> 1 hektar"],
  jumlahAnggotaTani: ["< 10", "10 - 20", "> 20"],
  produksiPanen: ["< 1 ton", "1 - 2 ton", "> 2 ton"],
  pemanfaatanBantuan: [
    "Pernah (tidak tepat guna)",
    "Pernah (tepat guna)",
    "Tidak pernah",
  ],
  statusLahan: ["Milik sendiri", "Sewa", "Bagi hasil"],
  pendapatan: ["> 5 juta", "2 - 5 juta", "< 2 juta"],
  rekomendasi: ["Tidak direkomendasikan", "Direkomendasikan"],
};

const Dashboard = () => {
  const [tab, setTab] = useState("rulebase");
  const [rulebase, setRulebase] = useState([]);
  const [loadingRulebase, setLoadingRulebase] = useState(false);
  const [errorRulebase, setErrorRulebase] = useState(null);

  useEffect(() => {
    if (tab === "rulebase" && rulebase.length === 0 && !loadingRulebase) {
      setLoadingRulebase(true);
      const token = localStorage.getItem("token");
      // Fetch data from Supabase for 'rulebase' tab
      supabase
        .from("rulebase")
        .select("*")
        .then(({ data, error }) => {
          if (error) {
            throw error;
          }
          setRulebase(data);
          setLoadingRulebase(false);
        })
        .catch((err) => {
          console.error("Error fetching rulebase:", err);
          setErrorRulebase("Gagal mengambil data rulebase");
          setLoadingRulebase(false);
        });
    }
  }, [tab]);

  // Since only rulebase tab is active, we don't need these functions/states related to other tabs
  // const [reports, setReports] = useState([]);
  // const [dataTrain, setDataTrain] = useState([]);
  // const [loadingTrain, setLoadingTrain] = useState(false);
  // const [errorTrain, setErrorTrain] = useState(null);
  // const [loadingHistory, setLoadingHistory] = useState(false);
  // const [errorHistory, setErrorHistory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const mapApiRow = (row) => ({
    luasLahan: row.luasLahan,
    anggotaTani: row.anggotaTani,
    hasilPanen: row.hasilPanen,
    pemanfaatanBantuan: row.pemanfaatanBantuan,
    statusLahan: row.statusLahan,
    pendapatan: row.pendapatan,
    rekomendasi: row.rekomendasi,
    kelas: row.kelas,
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (confirmDelete) {
      try {
        const { error } = await supabase.from("rulebase").delete().eq("id", id);

        if (error) {
          throw error;
        }
        alert("Data berhasil dihapus");
        setRulebase((prevData) => prevData.filter((item) => item.id !== id));
      } catch (err) {
        console.error("Error deleting rulebase:", err);
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
      const { error } = await supabase
        .from("rulebase")
        .update(editFormData)
        .eq("id", selectedData.id);

      if (error) {
        throw error;
      }
      alert("Data berhasil diperbarui");
      setShowEditModal(false);
      // Refresh data
      const { data, error: fetchError } = await supabase
        .from("rulebase")
        .select("*");
      if (fetchError) {
        throw fetchError;
      }
      setRulebase(data);
    } catch (err) {
      console.error("Error updating rulebase:", err);
      alert("Gagal memperbarui data");
    }
  };

  const handleInputChange = (field, value) => {
    const numericFields = [
      "luasLahan",
      "anggotaTani",
      "hasilPanen",
      "pemanfaatanBantuan",
      "statusLahan",
      "pendapatan",
      "rekomendasi",
    ];
    const convertedValue = numericFields.includes(field)
      ? parseInt(value) || 0
      : value;

    setEditFormData((prev) => ({
      ...prev,
      [field]: convertedValue,
    }));
  };

  const handleCreate = () => {
    alert("Create function is not implemented in this version.");
  };

  return (
    <div className="min-h-screen bg-slate-200">
      <div className="sticky top-0 z-10 bg-slate-200 py-4">
        <div className="flex gap-4 justify-center">
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 ${
              tab === "rulebase"
                ? "border-blue-600 text-blue-700 bg-blue-100"
                : "border-transparent text-gray-500 bg-gray-100"
            }`}
            onClick={() => setTab("rulebase")}
          >
            Rulebase
          </button>
        </div>
        <div className="flex gap-4 justify-center mt-4">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
          >
            <FaPlus className="mr-2" /> Create
          </button>
        </div>
      </div>
      <div className="p-10 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-7xl">
          <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
            Rule Base Tilang Expert
          </h1>
          <div className="overflow-x-auto">
            {loadingRulebase ? (
              <div className="text-center text-gray-500 py-8">
                Memuat data rulebase...
              </div>
            ) : errorRulebase ? (
              <div className="text-center text-red-500 py-8">
                {errorRulebase}
              </div>
            ) : rulebase.length === 0 ? (
              <div className="text-center text-gray-500">
                Belum ada data rulebase.
              </div>
            ) : (
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-2 border">No</th>
                    {Object.keys(rulebase[0])
                      .filter(
                        (key) =>
                          key !== "__v" && key !== "_id" && key !== "id_rule"
                      )
                      .map((key) => (
                        <th key={key} className="p-2 border">
                          {labelMap[key] || key}
                        </th>
                      ))}
                    <th className="p-2 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {rulebase.map((rule, idx) => (
                    <tr key={rule.id} className="even:bg-slate-50">
                      <td className="p-2 border text-center">{idx + 1}</td>
                      {Object.keys(rule)
                        .filter(
                          (key) =>
                            key !== "__v" && key !== "_id" && key !== "id_rule"
                        )
                        .map((key) => (
                          <td key={key} className="p-2 border text-center">
                            {valueMap[key]
                              ? valueMap[key][parseInt(rule[key]) - 1] ||
                                rule[key]
                              : rule[key]}
                          </td>
                        ))}
                      <td className="border p-1 flex items-center mt-5 justify-center gap-3">
                        <button
                          onClick={() => handleEdit(rule)}
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(rule.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Data Training</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Luas Lahan
                </label>
                <select
                  value={editFormData.luasLahan || ""}
                  onChange={(e) =>
                    handleInputChange("luasLahan", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Luas Lahan</option>
                  <option value="1">&lt; 0.5 hektar</option>
                  <option value="2">0.5 - 1 hektar</option>
                  <option value="3">&gt; 1 hektar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Jumlah Anggota Tani
                </label>
                <select
                  value={editFormData.anggotaTani || ""}
                  onChange={(e) =>
                    handleInputChange("anggotaTani", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Jumlah Anggota</option>
                  <option value="1">&lt; 10</option>
                  <option value="2">10 - 20</option>
                  <option value="3">&gt; 20</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Produksi Panen
                </label>
                <select
                  value={editFormData.hasilPanen || ""}
                  onChange={(e) =>
                    handleInputChange("hasilPanen", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Produksi Panen</option>
                  <option value="1">&lt; 1 ton</option>
                  <option value="2">1 - 2 ton</option>
                  <option value="3">&gt; 2 ton</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pemanfaatan Bantuan
                </label>
                <select
                  value={editFormData.pemanfaatanBantuan || ""}
                  onChange={(e) =>
                    handleInputChange("pemanfaatanBantuan", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Pemanfaatan Bantuan</option>
                  <option value="1">Pernah (tidak tepat guna)</option>
                  <option value="2">Pernah (tepat guna)</option>
                  <option value="3">Tidak pernah</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Status Lahan
                </label>
                <select
                  value={editFormData.statusLahan || ""}
                  onChange={(e) =>
                    handleInputChange("statusLahan", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Status Lahan</option>
                  <option value="1">Milik sendiri</option>
                  <option value="2">Sewa</option>
                  <option value="3">Bagi hasil</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pendapatan Musim
                </label>
                <select
                  value={editFormData.pendapatan || ""}
                  onChange={(e) =>
                    handleInputChange("pendapatan", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Pendapatan</option>
                  <option value="1">&gt; 5 juta</option>
                  <option value="2">2 - 5 juta</option>
                  <option value="3">&lt; 2 juta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Rekomendasi Penyuluh
                </label>
                <select
                  value={editFormData.rekomendasi || ""}
                  onChange={(e) =>
                    handleInputChange("rekomendasi", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Rekomendasi</option>
                  <option value="1">Tidak direkomendasikan</option>
                  <option value="2">Direkomendasikan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Hasil Prediksi
                </label>
                <select
                  value={editFormData.kelas || ""}
                  onChange={(e) => handleInputChange("kelas", e.target.value)}
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
