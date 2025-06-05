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
        Website ini merupakan hasil pengembangan dari sebuah proyek AI yang
        dirancang untuk mendukung proses penerimaan pupuk secara cerdas dan
        efisien. Proyek ini dikerjakan oleh mahasiswa Universitas Janabadra,
        <span className="font-bold">Raditya Aria Ramadhani, Heri Agus Supriyanto, dan Albertus Lie</span>, sebagai
        bagian dari tugas akhir dalam rangka proyek tugas akhir mata kuliah
        Kecerdasan Buatan. Pengembangan proyek ini dilakukan di bawah bimbingan
        dosen pembimbing kami, <span className="font-bold">Yumarlin MZ, S.Kom., M.Pd., M.Kom.</span>, yang telah
        memberikan arahan, masukan, serta dukungan penuh selama seluruh proses
        berlangsung. Tujuan utama dari website ini adalah untuk menyediakan
        platform modern berbasis kecerdasan buatan yang mampu membantu pengguna
        dalam melakukan analisis data dan pengambilan keputusan terkait
        penerimaan pupuk. Dengan mengintegrasikan teknologi AI dan desain yang
        responsif, kami berharap platform ini dapat memberikan solusi praktis
        dan pengalaman terbaik bagi para penggunanya. Kami mengucapkan terima
        kasih atas semua dukungan yang telah diberikan oleh Universitas
        Janabadra, dosen pembimbing, serta semua pihak yang telah berkontribusi
        dalam pengembangan proyek ini.
      </p>
    </div>
  );
};

export default Pengembang;
