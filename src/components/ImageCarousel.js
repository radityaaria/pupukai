import React from "react";

const ImageCarousel = () => {
  return (
    <div className="flex justify-center mt-4 gap-4 flex-col md:flex-row items-center">
      <div className="flex flex-col items-center space-x-2">
        <img
          src="/pelanggaran1.jpeg"
          width={288}
          height={288}
          alt="dokumentasi1"
          style={{ objectFit: "cover" }}
          className="w-72 h-72 rounded-lg shadow"
        />
        <h3 className="font-semibold text-lg">Tidak memakai helm</h3>
      </div>
      <div className="flex flex-col items-center space-x-2">
        <img
          src="/pelanggaran2.jpeg"
          width={288}
          height={288}
          alt="dokumentasi2"
          style={{ objectFit: "cover" }}
          className="w-72 h-72 rounded-lg shadow"
        />
        <h3 className="font-semibold text-lg">Menggunakan knalpot bising</h3>
      </div>
      <div className="flex flex-col items-center space-x-2">
        <img
          src="/pelanggaran3.jpeg"
          width={288}
          height={288}
          alt="dokumentasi2"
          style={{ objectFit: "cover" }}
          className="w-72 h-72 rounded-lg shadow"
        />
        <h3 className="font-semibold text-lg">
          Kendaraan parkir di tempat terlarang
        </h3>
      </div>
    </div>
  );
};

export default ImageCarousel;
