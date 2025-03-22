"use client";
import { v4 as uuidv4 } from "uuid";
import {
  checkEmptyPiece,
  checkFinish,
  convertDirToPosToTranslate,
  generatePieces,
  moveToPoint,
  shuffleArray,
} from "@/lib";
import { isMoveKey, Piece } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface Game {
  imgSrc: string;
  imgSize: number;
  pieceSize: number;
  rowsAndColsNo: number;
  setIsFinished: () => void;
}

const Game: React.FC<Game> = ({
  imgSrc,
  imgSize,
  rowsAndColsNo,
  pieceSize,
  setIsFinished,
}) => {
  const [pieces, SetPieces] = useState(generatePieces(imgSize, pieceSize));
  const [clickedPieceId, setClickedPieceId] = useState<null | string>();
  const piecesRef = useRef<Record<string, HTMLDivElement>>({});
  function handlePiecesChange(newPieces: Piece[]) {
    SetPieces(newPieces);
  }

  function swap(sourceIndex: number, targetIndex: number, source: Piece) {
    const piecesCopy = [...pieces];
    piecesCopy[sourceIndex] = piecesCopy[targetIndex];
    piecesCopy[targetIndex] = source;
    handlePiecesChange(piecesCopy);
  }

  // function finishTheGame() {
  //   const piecesAtCorrectPos = [...pieces].sort(
  //     (a, b) => a.correctIndex - b.correctIndex
  //   );
  //   console.log(piecesAtCorrectPos);
  //   handlePiecesChange(piecesAtCorrectPos);
  // }

  // useEffect(() => {
  //   console.log("finished?", checkFinish(pieces));
  // }, [pieces]);

  function handlePieceClick(clickedPieceId: string, clickedPieceIndex: number) {
    //check empty piece
    const result = checkEmptyPiece(
      pieces,
      clickedPieceIndex,
      "ALL",
      rowsAndColsNo
    );
    if (result === null) {
      return;
    }
    setClickedPieceId(clickedPieceId);
    //record
    const source = pieces[clickedPieceIndex];
    source.movedDir = result.foundDir;
    //swap
    swap(clickedPieceIndex, result.targetIndex, source);
  }

  useEffect(() => {
    if (!clickedPieceId) {
      return;
    }
    const el = piecesRef.current[clickedPieceId];
    const piece = pieces.find((pc) => pc.id === clickedPieceId);
    const { x, y } = convertDirToPosToTranslate(piece?.movedDir!);
    // console.log(piece?.movedDir);
    // console.log(convertDirToPosToTranslate(piece?.movedDir!));

    const keyframes = [
      // First keyframe: Invert (translate back to initial position)
      { transform: `translate(${-x}px, ${-y}px)`, transition: "none" },
      // Second keyframe: Play (translate to new position)
      { transform: `translate(0px, 0px)` },
    ];
    // console.log(keyframes);
    const animation = moveToPoint(el, keyframes);
    animation.onfinish = function () {
      checkFinish(pieces) && setIsFinished();
    };
    setClickedPieceId(null);
  }, [pieces]);

  return (
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
        className="z-40 absolute h-[10px] -left-[10px] -translate-y-[calc(100%)] bg-[#03a9fc]"
        style={{
          width: "calc(100% + 20px)",
          boxShadow: "rgb(110, 110, 110) 0px 4px 3px -3px",
        }}
      />
      {/* BOTTOM */}
      <div
        className="z-40 absolute h-[10px] -left-[10px] bottom-0 translate-y-[calc(100%)] bg-[#03a9fc]"
        style={{
          width: `calc(100% + 20px)`,
          boxShadow: "0px -2px 5px -3px rgba(52,53,56,1)",
        }}
      />
      {/* LEFT */}
      <div
        className="z-40 absolute w-[10px] -translate-x-[calc(100%)] bg-[#03a9fc]"
        style={{
          height: "calc(100%)",
          boxShadow: "2px 0px 5px -3px rgba(40,40,40,1)",
        }}
      />
      {/* RIGHT */}
      <div
        className="z-40 absolute w-[10px] right-0 translate-x-[calc(100%)] bg-[#03a9fc]"
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
        // const isLeftMostPiece = index % rowsAndColsNo === 0;
        // const isTopMostPiece = index < rowsAndColsNo;
        // const isRightMostPiece =
        //   index !== 0 && (index + 1) % rowsAndColsNo === 0;

        if (!piece.isEmptyPiece) {
          // const isEmptyPieceBelow = checkEmptyPiece(index, "BOTTOM") !== null;
          // const isEmptyPieceOnRight =
          //   checkEmptyPiece(index, "RIGHT") !== null;

          return (
            <div
              ref={(el) => {
                piecesRef.current[piece.id] = el!;
              }}
              key={piece.id}
              className="z-30 relative w-[100px] h-[100px]"
              onClick={(e) => handlePieceClick(piece.id, index)}
            >
              <div
                style={{
                  backgroundImage: `url(${imgSrc})`,
                  // backgroundSize: "500px 500px",
                  backgroundPosition: `top ${piece.bgPos?.y}px left ${piece.bgPos?.x}px`,
                  boxShadow: "rgb(80, 80, 80) 5px 5px 6px -2px",
                }}
                className={clsx("z-30 relative  h-full ")}
              />

              {/* bottom slide tab */}
              <div
                className={clsx(
                  "z-20 absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%]  w-14 h-4 rounded-4xl"
                )}
                style={{
                  boxShadow: "0px 2px 8px 0px rgba(80,80,80,1)",
                }}
              ></div>
              {/* right slide tab */}
              <div
                className={clsx(
                  "z-20 absolute top-[50%] -translate-y-[50%] right-0 translate-x-[50%]    w-4 h-14 rounded-4xl"
                )}
                style={{
                  boxShadow: " 2px 0px 8px 0px rgba(80,80,80,1)",
                }}
              ></div>
            </div>
          );
        } else {
          return (
            <div
              key={piece.id}
              className={clsx(" bg-transparent w-[100px] h-[100px")}
            ></div>
          );
        }
      })}
    </div>
  );
};

export default Game;
