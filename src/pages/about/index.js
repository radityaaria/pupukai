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
            Selamat Datang di Pupuk AI
          </h1>
          <p>
            Website ini merupakan platform sistem pendukung keputusan yang
            dirancang untuk membantu proses penentuan kelayakan penerimaan
            bantuan pupuk secara lebih cepat, akurat, dan objektif. Sistem ini
            dikembangkan menggunakan metode K-Nearest Neighbor (KNN) yang
            memanfaatkan data historis untuk mengidentifikasi calon penerima
            bantuan yang paling memenuhi kriteria.
          </p>
          <p>
            Dengan menggabungkan teknologi kecerdasan buatan dan algoritma
            pembelajaran mesin, kami berharap sistem ini dapat menjadi solusi
            transparan dan efisien dalam distribusi bantuan pupuk kepada petani
            yang membutuhkan. Website ini dibuat sebagai bagian dari proyek
            pengembangan berbasis riset dan tugas akhir.
          </p>
          <p>
            Jelajahi fitur kami dan lihat bagaimana AI dapat berperan penting
            dalam mendukung kebijakan pertanian yang lebih adil dan tepat
            sasaran.
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
          Penelitian ini berfokus pada pengembangan sebuah platform digital yang
          bertujuan membantu menentukan kelayakan penerimaan bantuan pupuk.
          Tujuannya adalah membuat proses seleksi penerima bantuan lebih
          objektif, efisien, dan berdasarkan data. Selain itu, penelitian ini
          juga mengkaji bagaimana pemanfaatan kecerdasan buatan dapat
          meningkatkan transparansi dan akurasi dalam penyaluran bantuan, serta
          dampaknya terhadap efektivitas program subsidi pertanian. Dengan
          mengintegrasikan teknologi ini ke dalam proses evaluasi, diharapkan
          platform ini dapat berkontribusi positif pada pengambilan kebijakan
          yang lebih adil dan tepat sasaran di sektor pertanian. Objek
          penelitian ini secara spesifik adalah program penyaluran pupuk organik
          yang akan dibagikan setiap bulan kepada kelompok tani yang memenuhi
          kriteria kelayakan. Program ini secara eksklusif ditujukan untuk
          kelompok tani yang berlokasi di wilayah Bantul.
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
