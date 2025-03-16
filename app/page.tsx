"use client";
import { v4 as uuidv4 } from "uuid";
import { generatePieces, shuffleArray } from "@/lib";
import { isMoveKey, Piece } from "@/types";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

const pieceSize = 100;
const imgSize = 300;
const rowsAndColsNo = imgSize / pieceSize;
const imgSrc = "/300.jpg";

const Page = () => {
  const [pieces, SetPieces] = useState(generatePieces(imgSize, pieceSize));
  function handlePiecesChange(newPieces: Piece[]) {
    SetPieces(newPieces);
  }

  function checkMovable(clickedPieceIndex: number): null | number {
    if (pieces[clickedPieceIndex - 1]?.isEmptyPiece) {
      return clickedPieceIndex - 1;
    }
    if (pieces[clickedPieceIndex + 1]?.isEmptyPiece) {
      return clickedPieceIndex + 1;
    }
    if (pieces[clickedPieceIndex + rowsAndColsNo]?.isEmptyPiece) {
      return clickedPieceIndex + rowsAndColsNo;
    }
    if (pieces[clickedPieceIndex - rowsAndColsNo]?.isEmptyPiece) {
      return clickedPieceIndex - rowsAndColsNo;
    }
    return null;
  }

  function swap(sourceIndex: number, targetIndex: number) {
    const piecesCopy = [...pieces];
    const temp = piecesCopy[targetIndex];
    piecesCopy[targetIndex] = piecesCopy[sourceIndex];
    piecesCopy[sourceIndex] = temp;
    handlePiecesChange(piecesCopy);
  }

  function handlePieceClick(clickedPieceIndex: number) {
    const targetIndex = checkMovable(clickedPieceIndex);
    if (targetIndex !== null) {
      swap(clickedPieceIndex, targetIndex);
    }
  }

  return (
    <div
      className={clsx(" bg-blue-200 w-fit h-fit grid gap-2 p-2", {
        "grid-cols-3": rowsAndColsNo === 3,
        "grid-cols-5": rowsAndColsNo === 5,
      })}
    >
      {pieces.map((piece, index) => {
        if (!piece.isEmptyPiece) {
          return (
            <div
              key={piece.id}
              onClick={() => handlePieceClick(index)}
              style={{
                backgroundImage: `url(${imgSrc})`,
                // backgroundSize: "500px 500px",
                backgroundPosition: `top ${piece.bgPos?.y}px left ${piece.bgPos?.x}px`,
              }}
              className={clsx("w-[100px] h-[100px] ")}
            />
          );
        } else {
          return (
            <div
              key={piece.id}
              className={clsx("bg-transparent w-[100px] h-[100px] ")}
            ></div>
          );
        }
      })}
    </div>
  );
};

export default Page;
