import React from "react";
import Image from "next/image";

const Pengembang = () => {
  return (
    <div className="min-h-screen flex items-center bg-slate-200 text-black flex-col py-20">
      <p className="mb-1 text-3xl font-bold">Team Pengembang Project</p>
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-center">
          <div className="flex flex-col items-center p-4">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-slate-300 shadow">
              <Image src="/yumarlin.jpeg" width={144} height={144} alt="yumarlin" />
            </div>
            <p className="mt-1 font-bold text-xl text-center">
              Yumarlin MZ, S.Kom., M.Pd., M.Kom.
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center space-x-4 mt-2">
          <div className="flex flex-col items-center p-4">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-slate-300 shadow">
              <Image src="/aria.jpeg" width={144} height={144} alt="aria" />
            </div>
            <p className="mt-4 font-bold text-xl text-center">Raditya Aria Ramadhani</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-slate-300 shadow">
              <Image src="/albertus.jpg" width={144} height={144} alt="albertus" />
            </div>
            <p className="mt-4 font-bold text-xl text-center">Albertus Lie</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-slate-300 shadow">
              <Image src="/heri.jpeg" width={144} height={144} alt="heri" />
            </div>
            <p className="mt-4 font-bold text-xl text-center">Heri Agus Supriyanto</p>
          </div>
        </div>
      </div>
      <p className="bg-slate-300 px-10 py-8 mt-4 text-xl">
        Website ini merupakan hasil pengembangan dari sebuah proyek sistem pakar yang dirancang untuk mendukung proses penentuan jenis pelanggaran lalu lintas dan besaran denda secara cerdas dan konsisten.
        Proyek ini dikerjakan oleh mahasiswa Universitas Janabadra, yaitu <strong>Raditya Aria Ramadhani, Heri Agus Supriyanto, dan Albertus Lie</strong>, sebagai bagian dari tugas akhir pada mata kuliah Sistem Pakar.

        Pengembangan sistem TilangExpert dilakukan di bawah bimbingan dosen pembimbing kami, <strong>Yumarlin MZ, S.Kom., M.Pd., M.Kom.</strong>, yang telah memberikan arahan, masukan, serta dukungan penuh selama seluruh proses perancangan dan implementasi berlangsung.

        Tujuan utama dari website ini adalah untuk menyediakan platform digital berbasis Certainty Factor (CF) yang dapat membantu petugas maupun pengguna dalam melakukan klasifikasi pelanggaran lalu lintas dan menentukan besaran denda yang sesuai dengan peraturan hukum yang berlaku.

        Dengan mengintegrasikan basis pengetahuan kasus, dan desain antarmuka yang responsif, kami berharap TilangExpert dapat menjadi solusi praktis untuk mendukung penegakan hukum yang lebih cepat, objektif, dan transparan.

        Kami mengucapkan terima kasih atas segala dukungan yang telah diberikan oleh Universitas Janabadra, dosen pembimbing, serta seluruh pihak yang telah berkontribusi dalam pengembangan proyek ini.
      </p>
    </div>
  );
};

export default Pengembang;
