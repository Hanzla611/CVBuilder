import React, { useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [modalImage, setModalImage] = useState(null);

  const openModal = (src) => {
    setModalImage(src);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <div className="pt-8 text-center overflow-hidden">
        <h1 className="text-3xl text-center text-red-500 font-bold">
          Choose your CV template
        </h1>
        <p className="text-center mt-8">
          Our professionally designed CV templates make the right impression.
        </p>
        <div className="flex m-2 w-full justify-center mt-8">
          {[
            "https://www.myperfectcv.co.uk/blobimages/sem-mpintl-images/muk/images/SA-CV-1.svg",
            "https://www.myperfectcv.co.uk/blobimages/sem-mpintl-images/muk/images/SA-CV-2.svg",
            "https://www.myperfectcv.co.uk/blobimages/sem-mpintl-images/muk/images/SA-CV-3.svg",
          ].map((src) => (
            <div className="relative w-1/5 m-2" key={src}>
              <img
                className="border-2 border-slate-500 hover:blur-sm w-full"
                src={src}
                alt="CV Template"
              />
              <button
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-slate-800 bg-opacity-50 text-white font-bold"
                onClick={() => openModal(src)}
              >
                Preview
              </button>
            </div>
          ))}
        </div>
        <button className="w-72 border-2 border-slate-500 rounded-full p-2 mt-8">
          View all templates
        </button>
      </div>

      {modalImage && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col backdrop-blur-sm"
            onClick={closeModal}
          >
            <div className="flex w-1/3 justify-between mb-6">
              <button className="mt-4 px-0 bg-red-500 text-white opacity-0">Start my CV</button>
              <Link 
                to="/make-cv"
                state={{ image: modalImage }} 
                className="mt-4 flex items-center rounded-full px-24 bg-red-500 text-white font-semibold mr-4"
              >
                Start my CV
              </Link>
              <button
                className="mt-4 p-2 text-white"
                onClick={closeModal}
              >
                ❌ 
              </button>
            </div>
            <div className="bg-white backdrop-blur-md w-1/4">
              <img
                className=" w-full"
                src={modalImage}
                alt="CV Template Preview"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
