import React from "react";

const Petunjuk = () => {
  return (
    <div className="min-h-screen bg-slate-200 p-6">
      <div className="bg-slate-300 p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Petunjuk Penggunaan Website TilangExpert
        </h1>
        <div className="space-y-6 text-lg">
          <div>
            <h2 className="text-2xl font-semibold mb-3">1. Menjelajahi Fitur Sistem</h2>
            <p className="mb-2">
              Anda dapat menjelajahi berbagai fitur sistem pada halaman utama TilangExpert, termasuk informasi mengenai proses klasifikasi pelanggaran lalu lintas dan teknologi Certainty Factor (CF) yang digunakan.
            </p>
            <p>
              Klik menu navigasi yang tersedia untuk melihat detail fitur seperti About, Pengembang, Identifikasi Pelanggaran, dan Dokumentasi.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">2. Melihat Informasi Sistem</h2>
            <p className="mb-2">
              Untuk memahami latar belakang dan tujuan dari sistem ini, silakan kunjungi halaman "About".
            </p>
            <p>
              Di sana terdapat penjelasan lengkap mengenai metode CF, cara sistem menentukan besaran denda, serta bagaimana hasil klasifikasi mengacu pada Undang-Undang Lalu Lintas Kepolisian Republik Indonesia.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">3. Login / Registrasi</h2>
            <p className="mb-2">
              Jika Anda ingin menggunakan sistem untuk mensimulasikan klasifikasi pelanggaran dan estimasi besaran denda, silakan login atau mendaftar terlebih dahulu.
            </p>
            <p>
              Akses akun pengguna memungkinkan Anda untuk mencoba langsung fitur Simulasi Tilang, menginput data pelanggaran, dan mendapatkan hasil analisis dari sistem pakar.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">4. Simulasi Penentuan Pelanggaran</h2>
            <p className="mb-2">
              Setelah berhasil login, buka halaman Simulasi Pelanggaran.
            </p>
            <p className="mb-2">
              Masukkan data sesuai dengan formulir yang tersedia, seperti:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 mb-2">
              <li>Jenis pelanggaran (contoh: melanggar lampu merah, tidak memakai helm, parkir sembarangan, melawan arus, dll)</li>
              <li>Status kelengkapan dokumen (SIM, STNK, plat kendaraan)</li>
              <li>Kondisi kejadian (lokasi, waktu, akibat/dampak)</li>
              <li>Deskripsi pelanggaran</li>
            </ul>
            <p>
              Setelah data dimasukkan, sistem akan menganalisis dan menampilkan hasil klasifikasi tingkat pelanggaran serta estimasi besaran denda berdasarkan kasus-kasus serupa dalam basis pengetahuan.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">5. Hubungi Kami</h2>
            <p>
              Jika Anda mengalami kendala, memiliki masukan, atau ingin menanyakan lebih lanjut mengenai sistem ini, silakan hubungi kami melalui informasi kontak yang tersedia.
            </p>
            <p className="mt-2">
              Tim pengembang TilangExpert siap membantu Anda untuk memastikan pengalaman penggunaan yang optimal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Petunjuk;
