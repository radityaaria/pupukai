import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Hanya satu pemanggilan dynamic untuk MapComponent
const MapComponent = dynamic(() => import("../../components/Map"), {
  ssr: false,
});

const About = () => {
  return (
    <div className="min-h-screen bg-slate-200 p-6">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex-1 space-y-4 text-lg">
          <h1 className="text-3xl font-bold mt-4 text-center md:text-left">
            Selamat Datang di Tilang Expert
          </h1>
          <p>
            Website ini merupakan platform sistem pakar berbasis web yang dirancang untuk membantu proses penentuan jenis pelanggaran lalu lintas serta besaran denda secara objektif dan konsisten.
            Sistem ini dikembangkan menggunakan metode Certainty Factor (CF), yaitu pendekatan kecerdasan buatan yang menggunakan faktor kepastian untuk menghitung tingkat keyakinan terhadap suatu kesimpulan berdasarkan aturan-aturan yang telah ditetapkan.
          </p>
          <p>
            Dengan penerapan metode CF, TilangExpert dapat menghitung tingkat kepastian dari setiap indikator pelanggaran, menggabungkan nilai certainty factor dari berbagai gejala yang teridentifikasi, menampilkan rekomendasi klasifikasi dan denda sesuai Undang-Undang Lalu Lintas Kepolisian Republik Indonesia, serta memberikan transparansi dalam proses penegakan hukum.
          </p>
          <p>
            Website ini merupakan bagian dari proyek pengembangan berbasis riset dan tugas akhir dalam bidang Sistem Pakar.

            Jelajahi fitur kami dan lihat bagaimana TilangExpert berperan dalam mendukung digitalisasi penegakan hukum yang lebih adil, efisien, dan terstandar.
          </p>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-center md:text-left">
            Lokasi Kami
          </h2>
          <MapComponent /> {/* Menampilkan peta lokasi */}
        </div>
      </div>
      <div className="mt-10 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-3xl mb-6 font-bold">Penjelasan Objek Penelitian</h2>
        {/* <p>
          Penelitian ini berfokus pada pengembangan platform digital berupa
          website yang membantu penentuan kelayakan penerimaan bantuan pupuk.
          Tujuan utamanya adalah untuk membantu proses seleksi calon penerima
          bantuan agar lebih objektif, efisien, dan berbasis data, menggunakan
          metode K-Nearest Neighbor (KNN) sebagai inti dari penentuan kriteria.
        </p> */}
        <p className="text-xl">
          Penelitian ini berfokus pada pengembangan sistem pakar berbasis CF (Certainty Factor) untuk membantu petugas dalam menentukan tingkat pelanggaran dan besaran denda secara cepat dan sesuai hukum.
          Tujuan utamanya adalah menciptakan sistem yang dapat meningkatkan konsistensi keputusan, akurasi penilaian, dan transparansi proses tilang di lapangan.
        </p>
        <p className="text-xl mt-4">
          Selain itu, penelitian ini juga mengkaji bagaimana penerapan Certainty Factor dapat membantu aparat kepolisian dalam:
        </p>
        <ul className="text-xl list-disc list-inside ml-4 space-y-2">
          <li>Mengidentifikasi jenis pelanggaran berdasarkan ciri-ciri kejadian,</li>
          <li>Menentukan besaran denda sesuai pasal hukum,</li>
          <li>Menyimpan dan memperbarui basis data kasus baru secara otomatis setelah diverifikasi.</li>
        </ul>
        <p className="text-xl mt-4">
          Objek penelitian difokuskan pada kasus pelanggaran lalu lintas umum di wilayah Yogyakarta dan sekitarnya, dengan studi awal melibatkan POLRES Bantul sebagai acuan data hukum dan klasifikasi pelanggaran yang berlaku.
        </p>
        <p className="mt-4 text-xl">
          Jika Anda memiliki pertanyaan, silakan hubungi kami melalui informasi
          di bawah ini:
        </p>
        <div className="mt-4">
          <strong className="text-2xl">POLRES Bantul</strong>
          <br />
          <div className="grid grid-cols-[auto,1fr] gap-x-2 max-w-xl text-xl">
            <span className="font-semibold min-w-max">Alamat:</span>
            <span className="break-words w-full">
              Jl. Jend. Sudirman No.202, Bejen, Bantul, Kec. Bantul, Kabupaten
              Bantul, Daerah Istimewa Yogyakarta 55711
            </span>
            <span className="font-semibold min-w-max">Telepon:</span>
            <span className="break-words w-full">(0274) 367570</span>
            <span className="font-semibold min-w-max">Email:</span>
            <span className="break-words w-full">polresbantul@gmail.com</span>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center mt-4 gap-4 flex-col md:flex-row items-center">
        <Image src="/dokumentasi1.jpeg" width={288} height={288} alt="dokumentasi1" style={{objectFit: 'cover'}} className="w-72 h-72 rounded-lg shadow" />
        <Image src="/dokumentasi2.jpeg" width={288} height={288} alt="dokumentasi2" style={{objectFit: 'cover'}} className="w-72 h-72 rounded-lg shadow" />
      </div> */}
    </div>
  );
};

export default About;
