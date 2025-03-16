import { Piece } from "@/types";
import { v4 as uuidv4 } from "uuid";

export function generatePieces(imgSize: number, pieceSize: number): Piece[] {
  const pieces: Piece[] = [];

  const rows = imgSize / pieceSize;
  const cols = imgSize / pieceSize;
  for (let r = 0; r < Array(rows).length; r++) {
    for (let c = 0; c < Array(cols).length; c++) {
      pieces.push({
        id: uuidv4(),
        bgPos: { x: -c * pieceSize, y: -r * pieceSize },
        isEmptyPiece: false,
      });
    }
  }
  const shuffledPieces = shuffleArray(pieces);
  shuffledPieces.push({
    id: uuidv4(),
    isEmptyPiece: true,
  });
  shuffledPieces.push({
    id: uuidv4(),
    isEmptyPiece: false,
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
