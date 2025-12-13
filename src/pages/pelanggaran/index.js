"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "../../../libs/supabaseClient";
import { useRouter } from "next/router";

const pertanyaanPelanggaran = [
  {
    id: "tidak_memakai_helm_sni",
    label: "Pengendara tidak memakai helm standar SNI",
  },
  {
    id: "melewati_lampu_merah",
    label: "Melewati lampu merah saat menyala merah",
  },
  {
    id: "melebihi_batas_kecepatan_kota",
    label: "Mengendarai melebihi batas kecepatan (≥100 km/jam di kota)",
  },
  {
    id: "menggunakan_ponsel_saat_berkendara",
    label: "Menggunakan ponsel saat berkendara",
  },
  {
    id: "mengemudi_dalam_pengaruh_alkohol",
    label: "Mengemudi dalam keadaan mabuk/alkohol tinggi",
  },
  {
    id: "parkir_di_tempat_terlarang",
    label: "Kendaraan parkir di tempat terlarang/trotoar",
  },
  { id: "balapan_liar", label: "Terlibat balapan liar di jalan umum" },
  {
    id: "melebihi_kapasitas_muatan",
    label: "Mengangkut penumpang/muatan melebihi kapasitas",
  },
  {
    id: "lampu_tidak_menyala_malam_hari",
    label: "Lampu kendaraan tidak menyala pada malam hari",
  },
  {
    id: "menyalip_di_garis_ganda",
    label: "Menyalip di garis ganda/melanggar marka jalan",
  },
  {
    id: "tidak_bawa_atau_tidak_punya_sim",
    label: "Tidak membawa/memiliki SIM saat diperiksa",
  },
  { id: "tidak_membawa_stnk", label: "Tidak membawa STNK kendaraan" },
  {
    id: "mengabaikan_perintah_petugas",
    label: "Mengabaikan perintah petugas lalu lintas",
  },
  { id: "tanpa_plat_nomor", label: "Mengemudi tanpa plat nomor kendaraan" },
  { id: "knalpot_bising", label: "Menggunakan knalpot bising (tidak standar)" },
  {
    id: "asap_kendaraan_berlebih",
    label: "Kendaraan mengeluarkan asap berlebih",
  },
  {
    id: "tidak_menyalakan_lampu_sein",
    label: "Tidak menyalakan lampu sein saat berbelok",
  },
  {
    id: "ugal_ugalan_menyebabkan_kecelakaan",
    label: "Mengemudi ugal-ugalan menyebabkan kecelakaan",
  },
  {
    id: "kendaraan_tidak_layak_jalan",
    label: "Menggunakan kendaraan tidak laik jalan (rem rusak, ban gundul)",
  },
  {
    id: "menghalangi_arus_lalu_lintas",
    label: "Menghalangi arus lalu lintas saat berhenti",
  },
];

const opsiJawaban = [
  { value: "tidak_tahu", label: "Tidak tahu / Tidak terjadi" },
  { value: "mungkin_tidak", label: "Mungkin tidak" },
  { value: "mungkin_ya", label: "Mungkin ya" },
  { value: "kemungkinan_besar_ya", label: "Kemungkinan besar ya" },
  { value: "hampir_pasti_ya", label: "Hampir pasti ya" },
  { value: "pasti_ya", label: "Pasti ya" },
];

const cfValueMap = {
  pasti_ya: 1.0,
  hampir_pasti_ya: 0.8,
  kemungkinan_besar_ya: 0.6,
  mungkin_ya: 0.4,
  mungkin_tidak: 0.2,
  tidak_tahu: 0.0,
};

const rules = [
  {
    ruleId: "R1",
    pasal: "291 (1)",
    denda: 250000,
    cfPakar: 0.95,
    gejala: ["tidak_memakai_helm_sni"],
    op: "OR",
    keterangan: "Tidak memakai helm standar SNI",
  },
  {
    ruleId: "R2",
    pasal: "287 (1–3)",
    denda: 500000,
    cfPakar: 0.9,
    gejala: [
      "melewati_lampu_merah",
      "melebihi_batas_kecepatan_kota",
      "parkir_di_tempat_terlarang",
      "menghalangi_arus_lalu_lintas",
    ],
    op: "OR",
    keterangan:
      "Melewati lampu merah / melebihi kecepatan / parkir terlarang / menghalangi arus",
  },
  {
    ruleId: "R3",
    pasal: "283",
    denda: 750000,
    cfPakar: 0.85,
    gejala: ["menggunakan_ponsel_saat_berkendara"],
    op: "OR",
    keterangan: "Menggunakan ponsel saat berkendara",
  },
  {
    ruleId: "R4",
    pasal: "311 (1)",
    denda: 1000000,
    cfPakar: 0.95,
    gejala: ["mengemudi_dalam_pengaruh_alkohol"],
    op: "OR",
    keterangan: "Mengemudi dalam pengaruh alkohol tinggi",
  },
  {
    ruleId: "R5",
    pasal: "297",
    denda: 3000000,
    cfPakar: 0.9,
    gejala: ["balapan_liar"],
    op: "OR",
    keterangan: "Balapan liar di jalan umum",
  },
  {
    ruleId: "R6",
    pasal: "307",
    denda: 500000,
    cfPakar: 0.85,
    gejala: ["melebihi_kapasitas_muatan"],
    op: "OR",
    keterangan: "Muatan/penumpang melebihi kapasitas",
  },
  {
    ruleId: "R7",
    pasal: "285 (1–2)",
    denda: 250000,
    cfPakar: 0.85,
    gejala: ["lampu_tidak_menyala_malam_hari", "kendaraan_tidak_layak_jalan"],
    op: "OR",
    keterangan: "Lampu tidak menyala / kendaraan tidak laik jalan",
  },
  {
    ruleId: "R8",
    pasal: "288 (1–2)",
    denda: 500000,
    cfPakar: 0.9,
    gejala: ["tidak_bawa_atau_tidak_punya_sim", "tidak_membawa_stnk"],
    op: "OR",
    keterangan: "Tidak membawa SIM / STNK",
  },
];

// helper format rupiah
const formatRupiah = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    Number(n || 0)
  );

const jawabanLabelMap = opsiJawaban.reduce((acc, opsi) => {
  acc[opsi.value] = opsi.label;
  return acc;
  // eslint-disable-next-line no-useless-return
}, {});

export default function PrediksiPupuk() {
  const [formData, setFormData] = useState({
    nama_pelanggar: "",
    alamat: "",
    ...pertanyaanPelanggaran.reduce((acc, q) => {
      acc[q.id] = "";
      return acc;
    }, {}),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRuleData, setNewRuleData] = useState({
    kode_rule: "",
    deskripsi: "",
    pasal: "",
    denda: "",
    cf_pakar: "",
  });

  const [ringkasanJawaban, setRingkasanJawaban] = useState(null);
  const router = useRouter();
  const [hasilPelanggaran, setHasilPelanggaran] = useState([]); // hasil per pasal
  const [totalDendaMaks, setTotalDendaMaks] = useState(0); // opsional total denda

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) ringkasan jawaban (tetap)
    const jawaban = pertanyaanPelanggaran.map((pertanyaan) => {
      const selectedValue = formData[pertanyaan.id];
      return {
        id: pertanyaan.id,
        pertanyaan: pertanyaan.label,
        jawaban: jawabanLabelMap[selectedValue] || "-",
        cf_user: cfValueMap[selectedValue] ?? 0.0,
      };
    });

    setRingkasanJawaban({
      nama: formData.nama_pelanggar,
      alamat: formData.alamat,
      detailJawaban: jawaban,
    });

    // 2) hitung CF tiap rule (OR => ambil MAX)
    const hasil = rules
      .map((r) => {
        const cfUserList = r.gejala.map((gid) => {
          const selected = formData[gid];
          return cfValueMap[selected] ?? 0.0;
        });

        const cfUserRule =
          r.op === "OR"
            ? Math.max(...cfUserList, 0)
            : cfUserList.reduce((a, b) => a * b, 1);

        const cfHasil = Number((cfUserRule * r.cfPakar).toFixed(3));

        return {
          ruleId: r.ruleId,
          pasal: r.pasal,
          keterangan: r.keterangan,
          cf_pakar: r.cfPakar,
          cf_user: Number(cfUserRule.toFixed(3)),
          cf_hasil: cfHasil,
          denda_maks: r.denda,
          // dipakai untuk UI (mana gejala yang paling memicu)
          gejalaTerpakai: r.gejala,
        };
      })
      // tampilkan yang benar-benar "terjadi" saja
      .filter((x) => x.cf_user > 0)
      // urutkan dari CF terbesar
      .sort((a, b) => b.cf_hasil - a.cf_hasil);

    setHasilPelanggaran(hasil);

    // 3) opsional total denda maksimal (kalau kamu mau dijumlahkan)
    const total = hasil.reduce((sum, item) => sum + (item.denda_maks || 0), 0);
    setTotalDendaMaks(total);

    // 4) (opsional) simpan riwayat ke Supabase
    // NOTE: sesuaikan kolom tabel identifikasi kamu
    // await supabase.from("identifikasi").insert([
    //   {
    //     nama_pelanggar: formData.nama_pelanggar,
    //     alamat: formData.alamat,
    //     hasil_json: hasil, // kalau kolom jsonb
    //     total_denda: total,
    //   },
    // ]);

    console.log("hasil:", hasil);
  };

  return (
    <main className="min-h-screen bg-slate-200 p-4 py-8">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Identifikasi Pelanggaran Lalu Lintas
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Silakan jawab pertanyaan berikut dengan memilih <strong>Ya</strong>{" "}
          atau <strong>Tidak</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Data Pelanggar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-gray-300">
            <div className="flex flex-col">
              <label
                htmlFor="nama_pelanggar"
                className="text-sm font-semibold text-gray-700 mb-1"
              >
                Nama Pelanggar
              </label>
              <input
                type="text"
                name="nama_pelanggar"
                id="nama_pelanggar"
                value={formData.nama_pelanggar}
                onChange={handleChange}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Nama lengkap"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="alamat"
                className="text-sm font-semibold text-gray-700 mb-1"
              >
                Alamat
              </label>
              <input
                type="text"
                name="alamat"
                id="alamat"
                value={formData.alamat}
                onChange={handleChange}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Alamat lengkap"
                required
              />
            </div>
          </div>

          {/* Kuesioner */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Pertanyaan Pelanggaran
            </h2>
            {pertanyaanPelanggaran.map((pertanyaan, index) => (
              <div
                key={pertanyaan.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <label className="block text-base font-semibold text-gray-700 mb-3">
                  {index + 1}. {pertanyaan.label}
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {opsiJawaban.map((opsi) => (
                    <label
                      key={opsi.value}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={pertanyaan.id}
                        value={opsi.value}
                        checked={formData[pertanyaan.id] === opsi.value}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        required
                      />
                      <span className="ml-2 text-base text-gray-700 font-medium">
                        {opsi.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-6 transition-colors"
          >
            Analisis Pelanggaran
          </button>
        </form>

        {ringkasanJawaban && (
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Ringkasan Jawaban
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base text-gray-700">
              <div>
                <span className="font-semibold">Nama Pelanggar</span>
                <p className="mt-1">{ringkasanJawaban.nama || "-"}</p>
              </div>
              <div>
                <span className="font-semibold">Alamat</span>
                <p className="mt-1">{ringkasanJawaban.alamat || "-"}</p>
              </div>
            </div>
            <div className="space-y-3">
              {ringkasanJawaban.detailJawaban.map((item, idx) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-gray-200 p-4 bg-white"
                >
                  <p className="font-semibold text-gray-800">
                    {idx + 1}. {item.pertanyaan}
                  </p>
                  <p className="mt-1 text-blue-700 font-medium">
                    {item.jawaban}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasilPelanggaran.length > 0 && (
          <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Hasil Analisis (CF & Denda Maksimal)
            </h3>

            <div className="text-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="font-semibold">Nama:</span>{" "}
                  {formData.nama_pelanggar}
                </div>
                <div>
                  <span className="font-semibold">
                    Total Denda Maksimal (opsional):
                  </span>{" "}
                  {formatRupiah(totalDendaMaks)}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-2 border">No</th>
                    <th className="p-2 border">Rule</th>
                    <th className="p-2 border">Pasal</th>
                    <th className="p-2 border">CF User</th>
                    <th className="p-2 border">CF Pakar</th>
                    <th className="p-2 border">CF Hasil</th>
                    <th className="p-2 border">Denda Maks</th>
                  </tr>
                </thead>
                <tbody>
                  {hasilPelanggaran.map((h, idx) => (
                    <tr key={h.ruleId} className="even:bg-slate-50">
                      <td className="p-2 border text-center">{idx + 1}</td>
                      <td className="p-2 border text-center">{h.ruleId}</td>
                      <td className="p-2 border">
                        <div className="font-semibold">{h.pasal}</div>
                        <div className="text-gray-600 text-xs">
                          {h.keterangan}
                        </div>
                      </td>
                      <td className="p-2 border text-center">{h.cf_user}</td>
                      <td className="p-2 border text-center">{h.cf_pakar}</td>
                      <td className="p-2 border text-center font-semibold text-blue-700">
                        {h.cf_hasil}
                      </td>
                      <td className="p-2 border text-center font-semibold">
                        {formatRupiah(h.denda_maks)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500">
              Catatan: CF Hasil = CF User (maks untuk OR) × CF Pakar.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
