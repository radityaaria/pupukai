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
    <div className={`${geistSans.variable} min-h-screen`}>
      <header
        className="text-white text-center py-20"
        style={{
          backgroundImage: "url('/pupuk.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl font-bold">SELAMAT DATANG DI PUPUK AI</h1>
        <p className="mt-4 text-lg">
        Keputusan terbaik untuk penyaluran bantuan pupuk.
        </p>
      </header>
      <div className="mt-1 p-8 bg-gray-100 rounded-lg px-12">
        <p>
          <span className="ml-8">Yogyakarta</span> dikenal sebagai salah satu wilayah pertanian yang aktif dan
          memiliki berbagai program bantuan untuk mendukung kesejahteraan
          petani. Namun, proses penentuan kelayakan penerima bantuan sering kali
          menghadapi tantangan seperti keterbatasan data, potensi subjektivitas,
          dan kurangnya transparansi. Untuk menjawab tantangan tersebut,
          dikembangkanlah sebuah sistem berbasis kecerdasan buatan yang mampu
          melakukan analisis kelayakan secara objektif dan efisien.
        </p>
        <br />
        <p>
          <span className="ml-8">Sistem ini</span> menggunakan pendekatan data-driven dengan metode K-Nearest
          Neighbor (KNN) untuk menilai setiap calon penerima berdasarkan
          kriteria tertentu yang telah ditetapkan. Dengan sistem ini, proses
          seleksi tidak hanya menjadi lebih cepat dan akurat, tetapi juga lebih
          adil. Pendekatan ini diharapkan mampu meningkatkan kualitas pelayanan
          dalam penyaluran bantuan dan memperkuat kepercayaan masyarakat
          terhadap program subsidi pertanian.
        </p>
      </div>
      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Serah Terima Bantuan Pupuk Organik</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
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
            <p className="text-gray-700">Pleret</p>
          </div>
          <div className="border rounded-lg p-4">
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
            <p className="text-gray-700">Sanden</p>
          </div>
          <div className="border rounded-lg p-4">
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
            <p className="text-gray-700">Sedayu</p>
          </div>
        </div>
      </main>
    </div>
  );
}
