import { Piece } from "@/types";
import { v4 as uuidv4 } from "uuid";

export function generatePieces(imgSize: number, pieceSize: number): Piece[] {
  const pieces: Piece[] = [];

  const rows = imgSize / pieceSize;
  const cols = imgSize / pieceSize;
  // let i = 1;
  // const posArray = Array(rows * cols - 1)
  //   .fill("")
  //   .map((x) => {
  //     return i++;
  //   });
  // const shuffledPosArray = shuffleArray(posArray);
  // console.log(shuffledPosArray);
  for (let r = 0; r < Array(rows).length; r++) {
    for (let c = 0; c < Array(cols).length; c++) {
      if (!(r === Array(rows).length - 1 && c === Array(cols).length - 1)) {
        pieces.push({
          id: uuidv4(),
          bgPos: { x: -c * pieceSize, y: -r * pieceSize },
          isEmptyPiece: false,
        });
      }
    }
  }
  const shuffledPieces = shuffleArray(pieces);
  shuffledPieces.push({
    id: uuidv4(),
    isEmptyPiece: true,
  });
  // console.log(shuffledPieces);
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
