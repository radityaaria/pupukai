'use client';

import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

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

const pertanyaanPelanggaran = [
  { id: 'tidak_memakai_helm_sni', label: 'Pengendara tidak memakai helm standar SNI' },
  { id: 'melewati_lampu_merah', label: 'Melewati lampu merah saat menyala merah' },
  { id: 'melebihi_batas_kecepatan_kota', label: 'Mengendarai melebihi batas kecepatan (≥100 km/jam di kota)' },
  { id: 'menggunakan_ponsel_saat_berkendara', label: 'Menggunakan ponsel saat berkendara' },
  { id: 'mengemudi_dalam_pengaruh_alkohol', label: 'Mengemudi dalam keadaan mabuk/alkohol tinggi' },
  { id: 'parkir_di_tempat_terlarang', label: 'Kendaraan parkir di tempat terlarang/trotoar' },
  { id: 'balapan_liar', label: 'Terlibat balapan liar di jalan umum' },
  { id: 'melebihi_kapasitas_muatan', label: 'Mengangkut penumpang/muatan melebihi kapasitas' },
  { id: 'lampu_tidak_menyala_malam_hari', label: 'Lampu kendaraan tidak menyala pada malam hari' },
  { id: 'menyalip_di_garis_ganda', label: 'Menyalip di garis ganda/melanggar marka jalan' },
  { id: 'tidak_bawa_atau_tidak_punya_sim', label: 'Tidak membawa/memiliki SIM saat diperiksa' },
  { id: 'tidak_membawa_stnk', label: 'Tidak membawa STNK kendaraan' },
  { id: 'mengabaikan_perintah_petugas', label: 'Mengabaikan perintah petugas lalu lintas' },
  { id: 'tanpa_plat_nomor', label: 'Mengemudi tanpa plat nomor kendaraan' },
  { id: 'knalpot_bising', label: 'Menggunakan knalpot bising (tidak standar)' },
  { id: 'asap_kendaraan_berlebih', label: 'Kendaraan mengeluarkan asap berlebih' },
  { id: 'tidak_menyalakan_lampu_sein', label: 'Tidak menyalakan lampu sein saat berbelok' },
  { id: 'ugal_ugalan_menyebabkan_kecelakaan', label: 'Mengemudi ugal-ugalan menyebabkan kecelakaan' },
  { id: 'kendaraan_tidak_layak_jalan', label: 'Menggunakan kendaraan tidak laik jalan (rem rusak, ban gundul)' },
  { id: 'menghalangi_arus_lalu_lintas', label: 'Menghalangi arus lalu lintas saat berhenti' },
];

const opsiJawaban = [
  { value: 'tidak_tahu', label: 'Tidak tahu / Tidak terjadi' },
  { value: 'mungkin_tidak', label: 'Mungkin tidak' },
  { value: 'mungkin_ya', label: 'Mungkin ya' },
  { value: 'kemungkinan_besar_ya', label: 'Kemungkinan besar ya' },
  { value: 'hampir_pasti_ya', label: 'Hampir pasti ya' },
  { value: 'pasti_ya', label: 'Pasti ya' },
];

const jawabanLabelMap = opsiJawaban.reduce((acc, opsi) => {
  acc[opsi.value] = opsi.label;
  return acc;
  // eslint-disable-next-line no-useless-return
}, {});

export default function PrediksiPupuk() {
  const [formData, setFormData] = useState({
    nama_pelanggar: '',
    alamat: '',
    ...pertanyaanPelanggaran.reduce((acc, q) => {
      acc[q.id] = '';
      return acc;
    }, {})
  });
  const [hasilPrediksi, setHasilPrediksi] = useState(null);
  const [ringkasanJawaban, setRingkasanJawaban] = useState(null);
  const reportRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const jawaban = pertanyaanPelanggaran.map(pertanyaan => ({
      id: pertanyaan.id,
      pertanyaan: pertanyaan.label,
      jawaban: jawabanLabelMap[formData[pertanyaan.id]] || '-'
    }));

    setRingkasanJawaban({
      nama: formData.nama_pelanggar,
      alamat: formData.alamat,
      detailJawaban: jawaban,
    });

    console.log("data");
  };

  // const handleExportPDF = async () => {
  //   if (!reportRef.current) return;
  //   const canvas = await html2canvas(reportRef.current);
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  //   const pageWidth = pdf.internal.pageSize.getWidth();
  //   const pageHeight = pdf.internal.pageSize.getHeight();
  //   const imgWidth = pageWidth - 40;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //   pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
  //   pdf.save('report-prediksi.pdf');
  // };

  return (
    <main className="min-h-screen bg-slate-200 p-4 py-8">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Identifikasi Pelanggaran Lalu Lintas
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Silakan jawab pertanyaan berikut dengan memilih <strong>Ya</strong> atau <strong>Tidak</strong>
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Data Pelanggar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-gray-300">
            <div className="flex flex-col">
              <label htmlFor="nama_pelanggar" className="text-sm font-semibold text-gray-700 mb-1">
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
              <label htmlFor="alamat" className="text-sm font-semibold text-gray-700 mb-1">
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
                  {opsiJawaban.map(opsi => (
                    <label key={opsi.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name={pertanyaan.id}
                        value={opsi.value}
                        checked={formData[pertanyaan.id] === opsi.value}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        required
                      />
                      <span className="ml-2 text-base text-gray-700 font-medium">{opsi.label}</span>
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
              <h3 className="text-xl font-semibold text-gray-800">Ringkasan Jawaban</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base text-gray-700">
              <div>
                <span className="font-semibold">Nama Pelanggar</span>
                <p className="mt-1">{ringkasanJawaban.nama || '-'}</p>
              </div>
              <div>
                <span className="font-semibold">Alamat</span>
                <p className="mt-1">{ringkasanJawaban.alamat || '-'}</p>
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
                  <p className="mt-1 text-blue-700 font-medium">{item.jawaban}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasilPrediksi && (
          <div
            ref={reportRef}
            style={{
              marginTop: 32,
              borderRadius: 12,
              padding: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              fontSize: 15,
              border: `2px solid ${hasilPrediksi.hasil === 'Layak' ? '#6ee7b7' : '#fca5a5'}`,
              backgroundColor: hasilPrediksi.hasil === 'Layak' ? '#d1fae5' : '#fee2e2',
              color: '#374151',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 500,
              maxWidth: 700,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 24, marginBottom: 8 }}>
              Keterangan Hasil Penentuan Pupuk Organik
            </div>
            <div
              style={{
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 20,
                color: hasilPrediksi.hasil === 'Layak' ? '#065f46' : '#991b1b',
                backgroundColor: hasilPrediksi.hasil === 'Layak' ? '#bbf7d0' : '#fecaca',
                borderRadius: 8,
                padding: 12,
                marginBottom: 20,
                display: 'inline-block',
                minWidth: 180,
              }}
            >
              Hasil: {hasilPrediksi.hasil}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 700, padding: 8, width: '40%' }}>Kelompok Tani</td>
                  <td style={{ padding: 8 }}>{formData.kelompok_tani}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, padding: 8 }}>Alamat</td>
                  <td style={{ padding: 8 }}>{formData.alamat}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, padding: 8 }}>Luas Lahan</td>
                  <td style={{ padding: 8 }}>{['< 0.5 hektar', '0.5 - 1 hektar', '> 1 hektar'][formData.luas_lahan-1]}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, padding: 8 }}>Jumlah Anggota Tani</td>
                  <td style={{ padding: 8 }}>{['< 10', '10 - 20', '> 20'][formData.anggota_tani-1]}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, padding: 8 }}>Produksi Panen</td>
                  <td style={{ padding: 8 }}>{['< 1 ton', '1 - 2 ton', '> 2 ton'][formData.hasil_panen-1]}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, padding: 8 }}>Pemanfaatan Bantuan</td>
                  <td style={{ padding: 8 }}>{['Pernah (tidak tepat guna)', 'Pernah (tepat guna)', 'Tidak pernah'][formData.pemanfaatan-1]}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, padding: 8 }}>Status Lahan</td>
                  <td style={{ padding: 8 }}>{['Milik sendiri', 'Sewa', 'Bagi hasil'][formData.status_lahan-1]}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, padding: 8 }}>Pendapatan Musim</td>
                  <td style={{ padding: 8 }}>{['> 5 juta', '2 - 5 juta', '< 2 juta'][formData.pendapatan-1]}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, padding: 8 }}>Rekomendasi Penyuluh</td>
                  <td style={{ padding: 8 }}>{['Tidak direkomendasikan', 'Direkomendasikan'][formData.rekomendasi-1]}</td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              onClick={handleExportPDF}
              style={{
                marginTop: 12,
                width: '100%',
                backgroundColor: '#2563eb',
                color: '#fff',
                fontWeight: 700,
                padding: '10px 0',
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              Unduh PDF
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
