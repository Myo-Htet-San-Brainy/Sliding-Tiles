"use client";
import { v4 as uuidv4 } from "uuid";
import { generatePieces, shuffleArray } from "@/lib";
import { isMoveKey, Piece } from "@/types";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

const pieceSize = 100;
const imgSize = 200;
const rowsAndColsNo = imgSize / pieceSize;
const imgSrc = "/200.jpg";

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
        targetIndex = currentlySelected! - rowsAndColsNo;
        if (isMovable(targetIndex)) {
          swap(targetIndex);
        }
        break;
      case "s":
        targetIndex = currentlySelected! + rowsAndColsNo;
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
    const targetPiece = pieces[targetIndex];

    if (!targetPiece || !targetPiece.isEmptyPiece) return false;

    if (targetIndex === pieces.length - 2) {
      return currentlySelected === targetIndex - rowsAndColsNo;
    }

    return true;
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
      console.log(keyName);
      if (isMoveKey(keyName)) {
        handleMoveKeys(keyName);
      }
    }
    if (currentlySelected !== null) {
      document.addEventListener("keydown", handleKeydown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [currentlySelected]);

  return (
    <div
      className={clsx(" bg-blue-200 w-fit h-fit   grid", {
        "grid-cols-2": rowsAndColsNo === 2,
        "grid-cols-5": rowsAndColsNo === 5,
      })}
    >
      {pieces.map((piece, index) => {
        if (!piece.isEmptyPiece) {
          if (index !== pieces.length - 1) {
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
                className={clsx("w-[100px] h-[100px] m-2", {
                  "shadow shadow-red-500": isSelected,
                  "mt-0": index === pieces.length - 2,
                })}
              />
            );
          } else {
            return (
              <div
                key={piece.id}
                className=" bg-black"
                // style={{ gridArea: gridArea }}
                style={{
                  gridArea: clsx({
                    "3 / 2 / 4 / span 1": rowsAndColsNo === 2,
                    "6 / 2 / 7 / span 4": rowsAndColsNo === 5,
                  }),
                }}
              ></div>
            );
          }
        } else {
          return (
            <div
              key={piece.id}
              className={clsx("bg-blue-200 w-[100px] h-[100px] m-2", {
                "mt-0": index === pieces.length - 2,
              })}
            ></div>
          );
        }
      })}
    </div>
  );
};

export default Page;
