"use client";
import { v4 as uuidv4 } from "uuid";
import { generatePieces, shuffleArray } from "@/lib";
import { isMoveKey, Piece } from "@/types";
import React, { useEffect, useState } from "react";

const pieceSize = 100;
const imgSize = 500;
const cols = imgSize / pieceSize;
const imgSrc = "/goodboi.jpg";

const Page = () => {
  const [pieces, SetPieces] = useState(generatePieces(imgSize, pieceSize));
  const [currentlySelected, setCurrentlySelected] = useState<number | null>(
    null
  );
  function handlePiecesChange(newPieces: Piece[]) {
    SetPieces(newPieces);
  }
  function handleMoveKeys(keyName: "w" | "a" | "s" | "d") {
    let targetIndex;
    switch (keyName) {
      case "w":
        targetIndex = currentlySelected! - cols;
        if (isMovable(targetIndex)) {
          swap(targetIndex);
        }
        break;
      case "s":
        targetIndex = currentlySelected! + cols;
        if (isMovable(targetIndex)) {
          swap(targetIndex);
        }
        break;
      case "a":
        targetIndex = currentlySelected! - 1;
        if (isMovable(targetIndex)) {
          swap(targetIndex);
        }
        break;
      case "d":
        targetIndex = currentlySelected! + 1;
        if (isMovable(targetIndex)) {
          swap(targetIndex);
        }
        break;
    }
  }

  function isMovable(targetIndex: number): boolean {
    return (
      pieces[targetIndex] !== undefined && pieces[targetIndex].isEmptyPiece
    );
  }

  function swap(targetIndex: number) {
    const piecesCopy = [...pieces];
    const temp = piecesCopy[targetIndex];
    piecesCopy[targetIndex] = piecesCopy[currentlySelected!];
    piecesCopy[currentlySelected!] = temp;
    handlePiecesChange(piecesCopy);
  }

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      const keyName = e.key;

      if (isMoveKey(keyName)) {
        handleMoveKeys(keyName);
      }
    }
    if (currentlySelected) {
      document.addEventListener("keydown", handleKeydown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [currentlySelected]);

  const gridCols = `grid-cols-${cols}`;
  return (
    <div
      className={`bg-white border-4 border-blue-500 w-fit h-fit grid ${gridCols} gap-2`}
    >
      {pieces.map((piece, index) => {
        if (!piece.isEmptyPiece) {
          const isSelected = currentlySelected === index;

          return (
            <div
              key={piece.id}
              onClick={(e) => {
                if (currentlySelected === index) {
                  setCurrentlySelected(null);
                  return;
                }
                setCurrentlySelected(index);
              }}
              style={{
                backgroundImage: `url(${imgSrc})`,
                // backgroundSize: "500px 500px",
                backgroundPosition: `top ${piece.bgPos?.y}px left ${piece.bgPos?.x}px`,
              }}
              className={`w-[100px] h-[100px] ${
                isSelected ? "shadow shadow-red-500" : ""
              }`}
            />
          );
        } else {
          return <div key={piece.id} className="w-[100px] h-[100px]"></div>;
        }
      })}
    </div>
  );
};

export default Page;
