import { Piece } from "@/types";
import { v4 as uuidv4 } from "uuid";

export function generatePieces(imgSize: number, pieceSize: number): Piece[] {
  const pieces: Piece[] = [];

  const rows = imgSize / pieceSize;
  const cols = imgSize / pieceSize;
  let x = 0;
  for (let r = 0; r < Array(rows).length; r++) {
    for (let c = 0; c < Array(cols).length; c++) {
      x = c + r * rows;
      // console.log("x", x);

      if (!(r === Array(rows).length - 1 && c === Array(cols).length - 1)) {
        pieces.push({
          id: uuidv4(),
          correctIndex: x,
          bgPos: { x: -c * pieceSize, y: -r * pieceSize },
          isEmptyPiece: false,
        });
      }
    }
  }
  const shuffledPieces = shuffleArray(pieces);
  shuffledPieces.push({
    id: uuidv4(),
    correctIndex: x,
    isEmptyPiece: true,
  });

  return shuffledPieces;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]; // Create a copy to avoid mutating the original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Pick a random index
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
}

export function moveToPoint(
  element: HTMLElement,
  keyframes: any[],
  duration: number
): Animation {
  const animation = element.animate(keyframes, {
    duration: duration,
  });
  return animation;
}

export function checkFinish(pieces: Piece[]): boolean {
  let isFinished = true;
  for (let a = 0; a < pieces.length; a++) {
    console.log("current pos", a);
    console.log("correct pos", pieces[a].correctIndex);
    console.log(a !== pieces[a].correctIndex);

    if (a !== pieces[a].correctIndex) {
      isFinished = false;
      break;
    }
  }
  return isFinished;
}

export function convertDirToPosToTranslate(
  dir: "TOP" | "LEFT" | "RIGHT" | "BOTTOM"
): {
  x: number;
  y: number;
} {
  const directionMap: Record<
    "TOP" | "LEFT" | "RIGHT" | "BOTTOM",
    { x: number; y: number }
  > = {
    TOP: { x: 0, y: -100 },
    LEFT: { x: -100, y: 0 },
    RIGHT: { x: 100, y: 0 },
    BOTTOM: { x: 0, y: 100 },
  };

  return directionMap[dir];
}

//return null if empty piece is not found in given dir
export function checkEmptyPiece(
  pieces: Piece[],
  sourceIndex: number,
  dir: "ALL" | "TOP" | "LEFT" | "RIGHT" | "BOTTOM",
  rowsAndColsNo: number
): null | {
  targetIndex: number;
  foundDir: "TOP" | "LEFT" | "RIGHT" | "BOTTOM";
} {
  if (dir === "ALL") {
    if (pieces[sourceIndex - 1]?.isEmptyPiece) {
      return { targetIndex: sourceIndex - 1, foundDir: "LEFT" };
    }
    if (pieces[sourceIndex + 1]?.isEmptyPiece) {
      return { targetIndex: sourceIndex + 1, foundDir: "RIGHT" };
    }
    if (pieces[sourceIndex + rowsAndColsNo]?.isEmptyPiece) {
      return { targetIndex: sourceIndex + rowsAndColsNo, foundDir: "BOTTOM" };
    }
    if (pieces[sourceIndex - rowsAndColsNo]?.isEmptyPiece) {
      return { targetIndex: sourceIndex - rowsAndColsNo, foundDir: "TOP" };
    }
  } else {
    if (dir === "TOP" && pieces[sourceIndex - rowsAndColsNo]?.isEmptyPiece) {
      return { targetIndex: sourceIndex - rowsAndColsNo, foundDir: "TOP" };
    }
    if (dir === "LEFT" && pieces[sourceIndex - 1]?.isEmptyPiece) {
      return { targetIndex: sourceIndex - 1, foundDir: "LEFT" };
    }
    if (dir === "BOTTOM" && pieces[sourceIndex + rowsAndColsNo]?.isEmptyPiece) {
      return { targetIndex: sourceIndex + rowsAndColsNo, foundDir: "BOTTOM" };
    }
    if (dir === "RIGHT" && pieces[sourceIndex + 1]?.isEmptyPiece) {
      return { targetIndex: sourceIndex + 1, foundDir: "RIGHT" };
    }
  }
  return null;
}
