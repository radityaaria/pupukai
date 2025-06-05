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
        backgroundImage: "url('/pupuk.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="relative text-white text-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-200/70 z-0"></div>
        <div className="relative text-black z-10">
          <h1 className="text-4xl font-bold">
            APLIKASI PENENTUAN BANTUAN PUPUK
          </h1>
          <p className="mt-4 text-lg">
            Solusi Cerdas untuk Bantuan Petani Bantul
          </p>
        </div>
      </header>
      <div className="mt-1 p-8 bg-gray-100/60 rounded-lg px-12 text-center">
        <p className="text-black z-10">Proses seleksi bantuan sering lambat dan kurang transparan. Sistem ini
        menggunakan analisis data untuk menilai kelayakan secara objektif,
        sehingga proses menjadi lebih cepat, adil, dan terpercaya.</p>
      </div>
      <main className="p-8">
        <h2 className="text-2xl text-white font-semibold mb-4">
          Serah Terima Bantuan Pupuk Organik
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative border rounded-lg p-4 overflow-hidden">
            <div className="absolute inset-0 bg-slate-200/60 rounded-lg z-0"></div>
            <div className="relative z-10">
              <div className="relative w-full pb-[100%]">
                <Image
                  src="/polres1.jpeg"
                  alt="Produk 1"
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <h3 className="font-bold mt-2">KWT Puspa Gemari Kedaton</h3>
              <p className="text-gray-800">Pleret</p>
            </div>
          </div>
          <div className="relative border rounded-lg p-4 overflow-hidden">
            <div className="absolute inset-0 bg-slate-200/60 rounded-lg z-0"></div>
            <div className="relative z-10">
              <div className="relative w-full pb-[100%]">
                <Image
                  src="/polres2.jpeg"
                  alt="Produk 2"
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <h3 className="font-bold mt-2">KWT Guyub Rukun Gadingharjo</h3>
              <p className="text-gray-800">Sanden</p>
            </div>
          </div>
          <div className="relative border rounded-lg p-4 overflow-hidden">
            <div className="absolute inset-0 bg-slate-200/60 rounded-lg z-0"></div>
            <div className="relative z-10">
              <div className="relative w-full pb-[100%]">
                <Image
                  src="/polres3.jpeg"
                  alt="Produk 3"
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <h3 className="font-bold mt-2">KWT Sari Dewi II Gubug Argosari</h3>
              <p className="text-gray-800">Sedayu</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
