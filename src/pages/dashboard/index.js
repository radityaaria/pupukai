import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { supabase } from "~/libs/supabaseClient";
import { useRouter } from "next/router";

const rulebaseLabelMap = {
  kode_rule: "Kode Rule",
  deskripsi: "Deskripsi",
  pasal: "Pasal",
  denda: "Denda",
  cf_pakar: "Cf Pakar",
};

const riwayatLabelMap = {
  id_riwayat: "ID Riwayat",
  nama_pelanggar: "Nama Pelanggar",
  alamat: "Alamat",
  detail_jawaban: "Detail Jawaban",
  hasil_pelanggaran: "Hasil Pelanggaran",
  total_denda_maks: "Total Denda Max",
  created_at: "Waktu Identifikasi",
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

const formatDetailJawaban = (detailJawaban) => {
  if (!detailJawaban || detailJawaban.length === 0) return "-";
  return (
    <ul className="list-inside text-left">
      {detailJawaban.map((item, idx) => (
        <li key={idx}>
          {idx + 1}. {item.pertanyaan}: {item.jawaban} (CF: {item.cf_user})
        </li>
      ))}
    </ul>
  );
};

const formatHasilPelanggaran = (hasilPelanggaran) => {
  if (!hasilPelanggaran || hasilPelanggaran.length === 0)
    return "Tidak ada pelanggaran teridentifikasi.";
  return (
    <ol className="list-inside text-left">
      {hasilPelanggaran.map((h, idx) => (
        <li key={idx}>
          {idx + 1}. Pasal {h.pasal} ({h.keterangan}), CF Hasil: {h.cf_hasil},
          Denda:{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(h.denda_maks)}
        </li>
      ))}
    </ol>
  );
};

const formatRupiah = (angka) => {
  const number = parseInt(angka);
  if (isNaN(number)) return "0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

const Dashboard = () => {
  const [tab, setTab] = useState("rulebase");
  const [rulebase, setRulebase] = useState([]);
  const [loadingRulebase, setLoadingRulebase] = useState(false);
  const [errorRulebase, setErrorRulebase] = useState(null);
  const [riwayatData, setRiwayatData] = useState([]);
  const [loadingRiwayat, setLoadingRiwayat] = useState(false);
  const [errorRiwayat, setErrorRiwayat] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [newRuleData, setNewRuleData] = useState({
    // State for new rule form data
    kode_rule: "",
    deskripsi: "",
    pasal: "",
    denda: "",
    cf_pakar: "",
  });
  const router = useRouter();

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

  useEffect(() => {
    if (tab === "riwayat" && riwayatData.length === 0 && !loadingRiwayat) {
      setLoadingRiwayat(true);
      supabase
        .from("riwayat")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .then(({ data, error }) => {
          if (error) {
            throw error;
          }
          setRiwayatData(data);
          setLoadingRiwayat(false);
        })
        .catch((err) => {
          console.error("Error fetching riwayat:", err);
          setErrorRiwayat("Gagal mengambil data riwayat");
          setLoadingRiwayat(false);
        });
    }
  }, [tab, riwayatData.length, loadingRiwayat]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const mapApiRow = (row) => ({
    kode_rule: row.kode_rule,
    deskripsi: row.deskripsi,
    pasal: row.pasal,
    denda: row.denda,
    cf_pakar: row.cf_pakar,
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (confirmDelete) {
      try {
        const { error } = await supabase
          .from("rulebase")
          .delete()
          .eq("id_rule", id);

        if (error) {
          throw error;
        }
        alert("Data berhasil dihapus");
        // Refetch rulebase data after successful deletion
        const { data: updatedRules, error: fetchError } = await supabase
          .from("rulebase")
          .select("*");
        if (fetchError) {
          throw fetchError;
        }
        setRulebase(updatedRules);
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
      console.log("Updating rule with ID:", selectedData.id_rule);
      console.log("Update payload:", editFormData);
      const { error } = await supabase
        .from("rulebase")
        .update(editFormData)
        .eq("id_rule", selectedData.id_rule);

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
    const numericFields = ["denda", "cf_pakar"];
    const convertedValue = numericFields.includes(field)
      ? (field === "denda" ? parseInt(value) : parseFloat(value)) || 0
      : value;

    setEditFormData((prev) => ({
      ...prev,
      [field]: convertedValue,
    }));
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setNewRuleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateRule = async () => {
    try {
      const { data, error } = await supabase.from("rulebase").insert([
        {
          kode_rule: newRuleData.kode_rule,
          deskripsi: newRuleData.deskripsi,
          pasal: newRuleData.pasal,
          denda: parseInt(newRuleData.denda),
          cf_pakar: parseFloat(newRuleData.cf_pakar),
        },
      ]);

      if (error) {
        throw error;
      }

      alert("Rule added successfully!");
      setNewRuleData({
        kode_rule: "",
        deskripsi: "",
        pasal: "",
        denda: "",
        cf_pakar: "",
      });
      setIsModalOpen(false);
      // Refresh rulebase data after successful creation
      const { data: updatedRules, error: fetchError } = await supabase
        .from("rulebase")
        .select("*");
      if (fetchError) {
        throw fetchError;
      }
      setRulebase(updatedRules);
    } catch (error) {
      alert("Error adding rule: " + error.message);
    }
  };

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("token"); // Clear any stored tokens
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("Failed to log out.");
    }
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
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 ${
              tab === "riwayat"
                ? "border-blue-600 text-blue-700 bg-blue-100"
                : "border-transparent text-gray-500 bg-gray-100"
            }`}
            onClick={() => setTab("riwayat")}
          >
            Riwayat
          </button>
        </div>
      </div>
      <div className="p-10 flex flex-col items-center justify-center">
        <div className="flex gap-4 justify-center mt-4">
          {tab === "rulebase" && (
            <button
              onClick={handleCreate}
              className="mt-2 mb-4 bg-green-600 text-white rounded hover:bg-green-800 flex items-center p-2"
            >
              <FaPlus className="mr-2" /> Create
            </button>
          )}
          <button
            onClick={handleLogout}
            className="mt-2 mb-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 font-semibold flex items-center"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
        <div
          className={`bg-white p-8 rounded-xl shadow-md w-full ${
            tab === "riwayat" ? "max-w-full" : "max-w-7xl"
          }`}
        >
          {tab === "rulebase" ? (
            <>
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
                              key !== "__v" &&
                              key !== "_id" &&
                              key !== "id_rule"
                          )
                          .map((key) => (
                            <th key={key} className="p-2 border">
                              {rulebaseLabelMap[key] || key}
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
                                key !== "__v" &&
                                key !== "_id" &&
                                key !== "id_rule"
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
                              onClick={() => handleDelete(rule.id_rule)}
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
            </>
          ) : tab === "riwayat" ? (
            <>
              <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
                Riwayat Identifikasi Pelanggaran
              </h1>
              <div className="overflow-x-auto">
                {loadingRiwayat ? (
                  <div className="text-center text-gray-500 py-8">
                    Memuat data riwayat...
                  </div>
                ) : errorRiwayat ? (
                  <div className="text-center text-red-500 py-8">
                    {errorRiwayat}
                  </div>
                ) : riwayatData.length === 0 ? (
                  <div className="text-center text-gray-500">
                    Belum ada data riwayat.
                  </div>
                ) : (
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="p-2 border">No</th>
                        {Object.keys(riwayatData[0])
                          .filter(
                            (key) =>
                              key !== "__v" &&
                              key !== "_id" &&
                              key !== "id_riwayat" &&
                              key !== "id_user"
                          )
                          .map((key) => {
                            let widthClass = "";
                            if (key === "detail_jawaban") {
                              widthClass = "w-[40%]";
                            } else if (key === "hasil_pelanggaran") {
                              widthClass = "w-[25%]";
                            }
                            return (
                              <th
                                key={key}
                                className={`p-2 border ${widthClass}`}
                              >
                                {riwayatLabelMap[key] || key}
                              </th>
                            );
                          })}
                      </tr>
                    </thead>
                    <tbody>
                      {riwayatData.map((riwayat, idx) => (
                        <tr
                          key={riwayat.id_riwayat}
                          className="even:bg-slate-50"
                        >
                          <td className="p-2 border text-center">{idx + 1}</td>
                          {Object.keys(riwayat)
                            .filter(
                              (key) =>
                                key !== "__v" &&
                                key !== "_id" &&
                                key !== "id_riwayat" &&
                                key !== "id_user"
                            )
                            .map((key) => {
                              let widthClass = "";
                              if (key === "detail_jawaban") {
                                widthClass = "w-[40%]";
                              } else if (key === "hasil_pelanggaran") {
                                widthClass = "w-[25%]";
                              }
                              return (
                                <td
                                  key={key}
                                  className={`p-2 border ${widthClass} ${
                                    key === "detail_jawaban"
                                      ? "text-left"
                                      : "text-center"
                                  }`}
                                >
                                  {key === "detail_jawaban"
                                    ? formatDetailJawaban(riwayat[key])
                                    : key === "hasil_pelanggaran"
                                    ? formatHasilPelanggaran(riwayat[key])
                                    : key === "total_denda_maks"
                                    ? formatRupiah(riwayat[key])
                                    : key === "created_at"
                                    ? new Date(riwayat[key]).toLocaleString(
                                        "id-ID",
                                        {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          second: "2-digit",
                                        }
                                      )
                                    : riwayat[key]}
                                </td>
                              );
                            })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Rule</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Kode Rule
                </label>
                <input
                  type="text"
                  name="kode_rule"
                  value={editFormData.kode_rule || ""}
                  onChange={(e) =>
                    handleInputChange("kode_rule", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Deskripsi
                </label>
                <textarea
                  name="deskripsi"
                  value={editFormData.deskripsi || ""}
                  onChange={(e) =>
                    handleInputChange("deskripsi", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  rows="3"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pasal</label>
                <input
                  type="text"
                  name="pasal"
                  value={editFormData.pasal || ""}
                  onChange={(e) => handleInputChange("pasal", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Denda</label>
                <input
                  type="number"
                  name="denda"
                  value={editFormData.denda || ""}
                  onChange={(e) => handleInputChange("denda", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  CF Pakar
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="cf_pakar"
                  value={editFormData.cf_pakar || ""}
                  onChange={(e) =>
                    handleInputChange("cf_pakar", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
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

      {/* Modal for creating new rule */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Create New Rule</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateRule();
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="kode_rule"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kode Rule
                </label>
                <input
                  type="text"
                  name="kode_rule"
                  id="kode_rule"
                  value={newRuleData.kode_rule}
                  onChange={handleModalChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="deskripsi"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deskripsi
                </label>
                <textarea
                  name="deskripsi"
                  id="deskripsi"
                  value={newRuleData.deskripsi}
                  onChange={handleModalChange}
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="pasal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pasal
                </label>
                <input
                  type="text"
                  name="pasal"
                  id="pasal"
                  value={newRuleData.pasal}
                  onChange={handleModalChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="denda"
                  className="block text-sm font-medium text-gray-700"
                >
                  Denda
                </label>
                <input
                  type="text"
                  name="denda"
                  id="denda"
                  value={newRuleData.denda}
                  onChange={handleModalChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="cf_pakar"
                  className="block text-sm font-medium text-gray-700"
                >
                  CF Pakar
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="cf_pakar"
                  id="cf_pakar"
                  value={newRuleData.cf_pakar}
                  onChange={handleModalChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
