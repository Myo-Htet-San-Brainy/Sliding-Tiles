export interface Piece {
  id: string;
  correctIndex: number;
  bgPos?: {
    x: number;
    y: number;
  };
  prevPos?: { x: number; y: number };
  movedDir?: "TOP" | "BOTTOM" | "LEFT" | "RIGHT";
  isEmptyPiece: boolean;
}

export type MoveKey = "w" | "a" | "s" | "d";
export const moveKeys = ["w", "a", "s", "d"];
export function isMoveKey(keyName: string): keyName is MoveKey {
  return moveKeys.includes(keyName);
}
