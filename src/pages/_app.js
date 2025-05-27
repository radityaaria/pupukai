import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
        <title>AI Penerimaan Pupuk</title>
        <meta name="description" content="Universitas Janabadra 2022" />
      </Head>
      <Navbar /> {/* Menambahkan komponen Navbar */}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
