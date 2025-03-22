"use client";

import { useEffect, useState } from "react";
import Game from "./Game";
import { useRouter } from "next/navigation";
import Image from "next/image";

const pieceSize = 100;
const imgSize = 300;
const rowsAndColsNo = imgSize / pieceSize;
const imgSrc =
  "https://fastly.picsum.photos/id/469/300/300.jpg?hmac=xs3Okxz4EH9kTLzRFif5LkLFBbpA3kr0T2CXG18H244";

const GameWrapper = () => {
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [imgSrcState, setImgSrcState] = useState(imgSrc);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleNewGame() {
    setIsLoading(true);
    setError(null);

    try {
      //fetch
      const res = await fetch("https://picsum.photos/300");

      if (!res.ok) {
        throw new Error("Failed to fetch image");
      }

      //reset the state
      setImgSrcState(res.url);
      //
      setIsFinished(false);
    } catch (err: any) {
      console.log(err);
      setError(err?.message || "An error occurred while loading the image");
    } finally {
      setIsLoading(false);
    }
  }
  console.log("imgSrcState", imgSrcState);

  return (
    <div className="relative min-h-screen grid place-items-center bg-gray-100">
      {isShowPreview && (
        <div className="z-50 absolute inset-0 bg-blue-300/50 backdrop-blur-sm flex  flex-col  gap-y-4 items-center justify-center ">
          <div className="relative h-[300px] w-[300px] ">
            <Image
              src={imgSrcState}
              alt="Random Image"
              fill
              className="rounded-md"
            />
          </div>
          <button
            onClick={() => setIsShowPreview(false)}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed "
          >
            Close
          </button>
        </div>
      )}

      <div className="flex flex-col gap-y-6 items-center  p-6 bg-white rounded-lg shadow-md max-w-md w-full">
        {error && (
          <div className="h-[420px]  w-full p-3 flex items-center justify-center bg-red-100 text-red-800 rounded-md text-center">
            {error}
          </div>
        )}

        {isLoading && !error && (
          <div className="h-[420px] flex items-center justify-center bg-white  rounded-md">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-blue-600 font-medium">
                Loading new image...
              </p>
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <Game
            imgSrc={imgSrcState}
            imgSize={imgSize}
            pieceSize={pieceSize}
            rowsAndColsNo={rowsAndColsNo}
            setIsFinished={() => setIsFinished(true)}
          />
        )}
        {!error && !isLoading && (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleNewGame}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed w-full"
            >
              {isLoading ? "Loading..." : "New Game"}
            </button>
            <button
              onClick={() => setIsShowPreview(true)}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed w-full"
            >
              Show Preview
            </button>

            {isFinished && (
              <div className="p-4 bg-green-100 text-green-800 rounded-md text-center w-full animate-pulse">
                🎉 Congratulations! You made it! 🎉
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameWrapper;
