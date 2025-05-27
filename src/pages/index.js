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
      <p>KONTOLODON</p>
      {/* <header
        className="text-white text-center py-20"
        style={{
          backgroundImage: "url('/halaman.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl font-bold">
          Selamat Datang di Toko Mebel Mbah Kayyun
        </h1>
        <p className="mt-4 text-lg">
          Temukan furnitur terbaik untuk rumah Anda
        </p>
      </header>
      <div className="mt-10 p-8 bg-gray-100 rounded-lg px-12">
        <p>
          <span className="ml-6 ">
            Yogyakarta telah menjadi pusat industri mebel yang terus berkembang,
          </span>
          menarik perhatian pasar lokal dan internasional. Permintaan akan
          furnitur berkualitas tinggi semakin meningkat, seiring dengan reputasi
          Yogyakarta sebagai pusat kerajinan kayu. Para pengrajin lokal di Jogja
          tidak hanya menghasilkan produk mebel yang fungsional, tetapi juga
          menghadirkan sentuhan estetika yang memukau. Dengan perpaduan desain
          tradisional yang kaya budaya dan elemen modern yang inovatif,
          produk-produk mebel dari Jogja mampu memenuhi kebutuhan beragam
          konsumen dan menjadi daya tarik tersendiri di pasar global.
        </p>
        <p>
          <span className="ml-6">
            Kami menerapkan sistem pembuatan berdasarkan pesanan (made-to-order)
          </span>
          untuk memastikan setiap produk memenuhi kebutuhan dan preferensi
          pelanggan. Namun, kami juga menyediakan beberapa produk yang siap
          pakai untuk pelanggan yang membutuhkan furnitur dengan segera. Dengan
          pendekatan ini, kami dapat menjaga kualitas produk dan memberikan
          layanan yang lebih baik kepada pelanggan kami.
        </p>
      </div>
      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Produk Unggulan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="relative w-full pb-[100%]">
              <Image
                src="/pintu.jpeg"
                alt="Produk 1"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h3 className="font-bold mt-2">Pintu</h3>
            <p className="text-gray-700">Rp 1.200.000</p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="relative w-full pb-[100%]">
              <Image
                src="/jendela.jpeg"
                alt="Produk 2"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h3 className="font-bold mt-2">Jendela</h3>
            <p className="text-gray-700">Rp 500.000</p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="relative w-full pb-[100%]">
              <Image
                src="/kusen.jpeg"
                alt="Produk 3"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h3 className="font-bold mt-2">Kusen</h3>
            <p className="text-gray-700">Rp 800.000</p>
          </div>
        </div>
      </main> */}
    </div>
  );
}