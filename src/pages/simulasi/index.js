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

export default function PrediksiPupuk() {
  const [formData, setFormData] = useState({
    kelompok_tani: '',
    alamat: '',
    luas_lahan: '1',
    anggota_tani: '1',
    hasil_panen: '1',
    pemanfaatan: '1',
    status_lahan: '1',
    pendapatan: '1',
    rekomendasi: '1'
  });
  const [hasilPrediksi, setHasilPrediksi] = useState(null);
  const reportRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = Object.fromEntries(
      Object.entries(formData)
        .filter(([k]) => !['kelompok_tani', 'alamat'].includes(k))
        .map(([k, v]) => [k, parseInt(v)])
    );
    const { hasil, detail } = prediksiKNN(input);
    const report = {
      ...formData,
      hasil,
      waktu: new Date().toISOString(),
    };
    setHasilPrediksi({ hasil, detail });
    
    // POST ke dataTrain dengan token
    try {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
      await axios.post('https://database-query.paso.dev/api/v1/c8bfefc8-ae85-456c-b5da-7ea4afccae33/dataTrain', {
        luasLahan: input.luas_lahan,
        anggotaTani: input.anggota_tani,
        hasilPanen: input.hasil_panen,
        pemanfaatan: input.pemanfaatan,
        statusLahan: input.status_lahan,
        pendapatan: input.pendapatan,
        rekomendasi: input.rekomendasi,
        kelas: hasil // 'Layak' atau 'Tidak Layak'
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Tambahkan token ke header
        }
      });
    } catch (err) {
      alert('Gagal menyimpan data ke server');
    }
  };

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    pdf.save('report-prediksi.pdf');
  };

  return (
    <main className="min-h-screen bg-slate-200 p-4 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Prediksi Kelayakan Bantuan Pupuk</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="kelompok_tani" className="text-sm font-semibold text-gray-700 mb-1">Kelompok Tani</label>
            <input
              type="text"
              name="kelompok_tani"
              id="kelompok_tani"
              value={formData.kelompok_tani}
              onChange={handleChange}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Nama Kelompok Tani"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="alamat" className="text-sm font-semibold text-gray-700 mb-1">Alamat</label>
            <input
              type="text"
              name="alamat"
              id="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Alamat Kelompok Tani"
              required
            />
          </div>
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
