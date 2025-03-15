export interface Piece {
  id: string;
  bgPos?: {
    x: number;
    y: number;
  };
  isEmptyPiece: boolean;
}

export type MoveKey = "w" | "a" | "s" | "d";
export const moveKeys = ["w", "a", "s", "d"];
export function isMoveKey(keyName: string): keyName is MoveKey {
  return moveKeys.includes(keyName);
}
