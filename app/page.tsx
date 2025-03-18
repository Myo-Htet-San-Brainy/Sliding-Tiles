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

  //return null if empty piece is not found in given dir
  function checkEmptyPiece(
    sourceIndex: number,
    dir: "ALL" | "TOP" | "LEFT" | "RIGHT" | "BOTTOM"
  ): null | number {
    switch (dir) {
      case "ALL":
        if (pieces[sourceIndex - 1]?.isEmptyPiece) {
          return sourceIndex - 1;
        }
        if (pieces[sourceIndex + 1]?.isEmptyPiece) {
          return sourceIndex + 1;
        }
        if (pieces[sourceIndex + rowsAndColsNo]?.isEmptyPiece) {
          return sourceIndex + rowsAndColsNo;
        }
        if (pieces[sourceIndex - rowsAndColsNo]?.isEmptyPiece) {
          return sourceIndex - rowsAndColsNo;
        }
        break;
      case "TOP":
        if (pieces[sourceIndex - rowsAndColsNo]?.isEmptyPiece) {
          return sourceIndex - rowsAndColsNo;
        }
        break;
      case "LEFT":
        if (pieces[sourceIndex - 1]?.isEmptyPiece) {
          return sourceIndex - 1;
        }
        break;
      case "BOTTOM":
        if (pieces[sourceIndex + rowsAndColsNo]?.isEmptyPiece) {
          return sourceIndex + rowsAndColsNo;
        }
        break;
      case "RIGHT":
        if (pieces[sourceIndex + 1]?.isEmptyPiece) {
          return sourceIndex + 1;
        }
        break;
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
    const targetIndex = checkEmptyPiece(clickedPieceIndex, "ALL");
    if (targetIndex !== null) {
      swap(clickedPieceIndex, targetIndex);
    }
  }

  const p = 8;
  const borderThickness = 1;
  return (
    <div className="h-screen grid place-items-center">
      <div
        className={clsx("relative bg-[#03a9fc] w-fit h-fit grid ", {
          "grid-cols-3": rowsAndColsNo === 3,
          "grid-cols-5": rowsAndColsNo === 5,
        })}
        style={{ boxShadow: "8px 8px 35px 6px rgba(0,0,0,0.75)" }}
      >
        {/* BORDERS */}
        {/* TOP */}
        <div
          className="z-30 absolute h-[10px] -left-[10px] -translate-y-[calc(100%)] bg-[#03a9fc]"
          style={{
            width: "calc(100% + 20px)",
            boxShadow: "rgb(110, 110, 110) 0px 4px 3px -3px",
          }}
        />
        {/* BOTTOM */}
        <div
          className="z-30 absolute h-[10px] -left-[10px] bottom-0 translate-y-[calc(100%)] bg-[#03a9fc]"
          style={{
            width: `calc(100% + 20px)`,
            boxShadow: "0px -2px 5px -3px rgba(52,53,56,1)",
          }}
        />
        {/* LEFT */}
        <div
          className="z-30 absolute w-[10px] -translate-x-[calc(100%)] bg-[#03a9fc]"
          style={{
            height: "calc(100%)",
            boxShadow: "2px 0px 5px -3px rgba(40,40,40,1)",
          }}
        />
        {/* RIGHT */}
        <div
          className="z-30 absolute w-[10px] right-0 translate-x-[calc(100%)] bg-[#03a9fc]"
          style={{
            height: `calc(100%)`,
            boxShadow: "-2px 0px 5px -3px rgba(52,53,56,1)",
          }}
        />
        {/* Sliders */}
        {/* TOP */}
        <div
          className="z-20 absolute h-[4px] bg-[#03a9fc]"
          style={{
            width: "calc(100%)",
            boxShadow: "rgb(80, 80, 80) 0px 1px 3px 0px",
          }}
        />
        {/* LEFT */}
        <div
          className="z-20 absolute top-[4px] w-[4px] bg-[#03a9fc]"
          style={{
            height: "calc(100% - 4px)",
            boxShadow: "rgb(80, 80, 80) 1px 0px 3px 0px",
          }}
        />
        {/* PIECES */}
        {pieces.map((piece, index) => {
          const isLeftMostPiece = index % rowsAndColsNo === 0;
          const isTopMostPiece = index < rowsAndColsNo;
          const isRightMostPiece =
            index !== 0 && (index + 1) % rowsAndColsNo === 0;

          if (!piece.isEmptyPiece) {
            const isEmptyPieceBelow = checkEmptyPiece(index, "BOTTOM") !== null;
            const isEmptyPieceOnRight =
              checkEmptyPiece(index, "RIGHT") !== null;
            const boxShadow = isEmptyPieceBelow
              ? "rgb(80, 80, 80) 0px 5px 6px -2px"
              : isEmptyPieceOnRight
              ? "rgb(80, 80, 80) 5px 0px 6px -2px"
              : "";
            return (
              <div
                key={piece.id}
                onClick={() => handlePieceClick(index)}
                style={{
                  backgroundImage: `url(${imgSrc})`,
                  // backgroundSize: "500px 500px",
                  backgroundPosition: `top ${piece.bgPos?.y}px left ${piece.bgPos?.x}px`,
                  boxShadow: boxShadow,
                }}
                className={clsx("z-50 w-[100px] h-[100px] ")}
              />
            );
          } else {
            return (
              <div
                key={piece.id}
                className={clsx("relative bg-transparent w-[100px] h-[100px")}
              >
                {/* top border */}

                {/* <div
                className={clsx("absolute -top-[1px] w-full h-[1px]", {
                  hidden: !isTopMostPiece,
                })}
                style={{ boxShadow: "0px 2px 2px 0px rgba(45,45,51,1)" }}
              /> */}
                {/* left border */}
                {/* <div
                className={clsx("absolute -left-[1px] h-full w-[1px]", {
                  hidden: !isLeftMostPiece,
                })}
                style={{ boxShadow: "2px 0px 2px 0px rgba(45,45,51,1)" }}
              /> */}
                {/* right border */}
                {/* <div
                className={clsx("absolute -right-[1px] h-full w-[1px]", {
                  hidden: !isRightMostPiece,
                })}
                style={{ boxShadow: "-2px 0px 2px 0px rgba(45,45,51,1)" }}
              /> */}
                {/* bottom slide tab */}
                <div
                  className={clsx(
                    "absolute left-[50%] -translate-x-[50%] -translate-y-[50%]     w-14 h-4 rounded-4xl",
                    {
                      hidden: isTopMostPiece,
                    }
                  )}
                  style={{
                    boxShadow: "0px 2px 8px 0px rgba(80,80,80,1)",
                  }}
                ></div>
                {/* right slide tab */}
                <div
                  className={clsx(
                    "absolute top-[50%] -translate-y-[50%] -translate-x-[50%]    w-4 h-14 rounded-4xl",
                    {
                      hidden: isLeftMostPiece,
                    }
                  )}
                  style={{
                    boxShadow: " 2px 0px 8px 0px rgba(80,80,80,1)",
                  }}
                ></div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Page;
