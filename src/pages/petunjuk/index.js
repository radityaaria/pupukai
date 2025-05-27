import React from "react";

const Petunjuk = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="bg-slate-200 p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Petunjuk Penggunaan Website
        </h1>
        <div className="space-y-4 text-lg">
          <h2 className="text-2xl font-semibold">1. Menjelajahi Produk</h2>
          <p>
            Anda dapat menjelajahi berbagai produk yang kami tawarkan di halaman
            utama. Klik pada gambar produk untuk melihat detail lebih lanjut.
          </p>

          <h2 className="text-2xl font-semibold">2. Melihat Lokasi Toko</h2>
          <p>
            Untuk mengetahui lokasi kami, silakan kunjungi halaman "About" dan
            lihat peta yang tersedia. Anda dapat menggunakan peta untuk
            mendapatkan petunjuk arah.
          </p>

          <h2 className="text-2xl font-semibold">3. Melakukan Pemesanan</h2>
          <p>
            Jika Anda tertarik dengan produk tertentu, silakan hubungi kami
            melalui informasi kontak yang tersedia di halaman "Kontak Kami".
            Kami akan membantu Anda dalam proses pemesanan.
          </p>

          <h2 className="text-2xl font-semibold">4. Login / Register</h2>
          <p>
            Jika anda ingin mensimulasikan berapa banyak produk yang dapat
            dihasilkan dari banyaknya stock bahan silahkan login / mendaftar
            untuk bisa mengakses halaman simulasi.
          </p>

          <h2 className="text-2xl font-semibold">5. Simulasi Hitung</h2>
          <p>
            Setelah berhasil login silahkan pergi menuju halaman Simulasi Hitung
            dan inputkan jumlah bahan untuk mengetahui berapa banyak produk yang
            dapat dihasilkan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Petunjuk;
