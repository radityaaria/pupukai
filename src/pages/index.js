import Image from "next/image";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} min-h-screen`}
      style={{
        backgroundImage: "url('/bghome.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="relative text-white text-center py-12 overflow-hidden">
        <div className="absolute inset-0 bg-slate-200/70 z-0"></div>
        <div className="relative text-black z-10">
          <h1 className="text-4xl font-bold">
          TILANGEXPERT
          </h1>
          <p className="mt-4 text-lg">
          Solusi Cerdas untuk Penentuan Pelanggaran dan Lalu Lintas
          </p>
        </div>
      </header>
      {/* <div className="mt-1 p-8 bg-gray-100/60 rounded-lg px-12 text-center">
        <p className="text-black z-10"> Proses penentuan pelanggaran lalu lintas sering kali tidak konsisten karena
      perbedaan interpretasi di lapangan dan keterbatasan rujukan kasus serupa. {""}
      <strong>TilangExpert</strong> membantu petugas menilai jenis
      pelanggaran (ringan, sedang, atau berat) serta besaran denda yang sesuai
      dengan Undang-Undang Lalu Lintas.
      Dengan sistem ini, proses penegakan hukum menjadi lebih {""}
      <strong>cepat, adil, dan transparan</strong>.</p>
      </div> */}
      <main className="p-4">
        {/* <h2 className="text-2xl text-black font-bold mb-4">
          Contoh Jenis Pelanggaran dan Denda Lalu Lintas
        </h2> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative border rounded-lg p-3 overflow-hidden">
            <div className="absolute inset-0 bg-slate-200/60 rounded-lg z-0"></div>
            <div className="relative z-10">
              <div className="relative w-full pb-[50%]">
                <Image
                  src="/pelanggaran1.jpeg"
                  alt="Produk 1"
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <h3 className="font-bold mt-2 text-sm">Tidak memakai helm</h3>
              <p className="text-black text-sm">Pasal 291 ayat (1)</p>
              <p className="text-black text-sm">Rp. 250.000 (Ringan)</p>
            </div>
          </div>
          <div className="relative border rounded-lg p-3 overflow-hidden">
            <div className="absolute inset-0 bg-slate-200/60 rounded-lg z-0"></div>
            <div className="relative z-10">
              <div className="relative w-full pb-[50%]">
                <Image
                  src="/pelanggaran2.jpeg"
                  alt="Produk 2"
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <h3 className="font-bold mt-2 text-sm">Menggunakan knalpot bising</h3>
              <p className="text-black text-sm">Pasal 285 ayat (1)</p>
              <p className="text-black text-sm">Rp. 250.000 (Ringan)</p>
            </div>
          </div>
          <div className="relative border rounded-lg p-3 overflow-hidden">
            <div className="absolute inset-0 bg-slate-200/60 rounded-lg z-0"></div>
            <div className="relative z-10">
              <div className="relative w-full pb-[50%]">
                <Image
                  src="/pelanggaran3.jpeg"
                  alt="Produk 3"
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <h3 className="font-bold mt-2 text-sm">Kendaraan parkir di tempat terlarang / trotoar</h3>
              <p className="text-black text-sm">Pasal 287 ayat (3)</p>
              <p className="text-black text-sm">Rp. 250.000 (Ringan)</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
