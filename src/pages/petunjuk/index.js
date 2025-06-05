import React from "react";

const Petunjuk = () => {
  return (
    <div className="min-h-screen bg-slate-200 p-6">
      <div className="bg-slate-300 p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Petunjuk Penggunaan Website
        </h1>
        <div className="space-y-4 text-lg">
          <h2 className="text-2xl font-semibold">1. Menjelajahi Fitur Sistem</h2>
          <p>
            Anda dapat menjelajahi berbagai fitur sistem di halaman utama, termasuk informasi mengenai proses seleksi bantuan dan teknologi yang digunakan. Klik pada menu yang tersedia untuk melihat detail lebih lanjut.
          </p>

          <h2 className="text-2xl font-semibold">2. Melihat Informasi Sistem</h2>
          <p>
            Untuk memahami latar belakang dan tujuan dari sistem ini, silakan kunjungi halaman "Tentang Kami". Di sana terdapat penjelasan mengenai metode KNN dan manfaat sistem bagi penyaluran bantuan pertanian.
          </p>

          <h2 className="text-2xl font-semibold">3. Login / Registrasi</h2>
          <p>
            Jika Anda ingin menggunakan sistem untuk mensimulasikan kelayakan penerimaan bantuan pupuk, silakan login atau mendaftar terlebih dahulu untuk mendapatkan akses ke halaman simulasi.
          </p>

          <h2 className="text-2xl font-semibold">4. Simulasi Kelayakan</h2>
          <p>
            Setelah berhasil login, buka halaman Simulasi Kelayakan. Inputkan data sesuai formulir yang tersedia, seperti luas lahan, Jumlah anggota tani, Produksi hasil panen, pemanfaatan bantuan sebelumnya, status lahan,pendapatan rata-rata permusim,dan rekomendasi dari penyuluh. Sistem akan menganalisis dan menampilkan hasil kelayakan berdasarkan data yang Anda masukkan.
          </p>

          <h2 className="text-2xl font-semibold">5. Hubungi Kami</h2>
          <p>
            Jika Anda mengalami kendala atau memiliki pertanyaan lebih lanjut, silakan hubungi tim kami melalui informasi kontak yang tersedia di halaman "Kontak". Kami siap membantu Anda.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Petunjuk;
