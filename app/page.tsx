"use client";

import { useEffect, useRef } from "react";

const page = () => {
  const sourceImgRef = useRef<null | HTMLImageElement>(null);
  const destCanvasRef = useRef<null | HTMLCanvasElement>(null);

  useEffect(() => {
    if (destCanvasRef.current && sourceImgRef.current) {
      const ctx = destCanvasRef.current.getContext("2d");
      //set canvas size same as pic size
      console.log("natural w", sourceImgRef.current?.naturalWidth);
      console.log("natural h", sourceImgRef.current?.naturalHeight);

      console.log(" w", sourceImgRef.current?.width);
      console.log(" h", sourceImgRef.current?.height);

      destCanvasRef.current.width = sourceImgRef.current?.naturalWidth;
      destCanvasRef.current.height = sourceImgRef.current?.naturalHeight;

      //no of rows, no of cols
      const pieceSize = 100;
      const rows = 500 / pieceSize;
      const cols = 500 / pieceSize;
      //get data ready - sx, sy, sw, sh, dx, dy, dw, dh
      const pieces = [];
      for (let r = 0; r < Array(rows).length; r++) {
        for (let y = 0; y < Array(cols).length; y++) {
          const sx = r * pieceSize;
          const sy = y * pieceSize;
          const sw = pieceSize;
          const sh = pieceSize;
          const dx = r * pieceSize;
          const dy = y * pieceSize;
          const dw = pieceSize;
          const dh = pieceSize;
          pieces.push({ sx, sy, sw, sh, dx, dy, dw, dh });
        }
      }
      // render
      pieces.forEach((piece, index) => {
        // console.log(`piece ${index}:`, {
        //   sx: piece.sx,
        //   sy: piece.sy,
        //   sw: piece.sw,
        //   sh: piece.sh,
        //   dx: piece.dx,
        //   dy: piece.dy,
        //   dw: piece.dw,
        //   dh: piece.dh,
        // });
        ctx?.drawImage(
          sourceImgRef.current as HTMLImageElement,
          piece.sx,
          piece.sy,
          piece.sw,
          piece.sh,
          piece.dx,
          piece.dy,
          piece.dw,
          piece.dh
        );
      });

      //   sx: pieces[0].sx,
      //   sy: pieces[0].sy,
      //   sw: pieces[0].sw,
      //   sh: pieces[0].sh,
      //   dx: pieces[0].dx,
      //   dy: pieces[0].dy,
      //   dw: pieces[0].dw,
      //   dh: pieces[0].dh,
      // });

      // ctx?.drawImage(
      //   sourceImgRef.current as HTMLImageElement,
      //   pieces[0].sx,
      //   pieces[0].sy,
      //   pieces[0].sw,
      //   pieces[0].sh,
      //   pieces[0].dx,
      //   pieces[0].dy,
      //   pieces[0].dw,
      //   pieces[0].dh
      // );

      // console.log(`piece 1:`, {
      //   sx: pieces[1].sx,
      //   sy: pieces[1].sy,
      //   sw: pieces[1].sw,
      //   sh: pieces[1].sh,
      //   dx: pieces[1].dx,
      //   dy: pieces[1].dy,
      //   dw: pieces[1].dw,
      //   dh: pieces[1].dh,
      // });

      // ctx?.drawImage(
      //   sourceImgRef.current as HTMLImageElement,
      //   pieces[1].sx,
      //   pieces[1].sy,
      //   pieces[1].sw,
      //   pieces[1].sh,
      //   pieces[1].dx,
      //   pieces[1].dy,
      //   pieces[1].dw,
      //   pieces[1].dh
      // );
    }
  }, []);

  return (
    <div>
      <canvas ref={destCanvasRef}></canvas>
      <img ref={sourceImgRef} src="/goodboi.jpg" alt="idk" className="hidden" />
    </div>
  );
};
export default page;
