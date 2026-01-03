import Image from "next/image";
import localFont from "next/font/local";
import ImageCarousel from "../components/ImageCarousel";

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
          <h1 className="text-6xl font-bold">TILANGEXPERT</h1>
          <p className="mt-4 text-xl font-bold">
            Sistem Cerdas untuk Penentuan Pelanggaran dan Denda Lalu Lintas
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
    </div>
  );
}
