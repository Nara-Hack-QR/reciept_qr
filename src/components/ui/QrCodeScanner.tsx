"use client";

import jsQR from "jsqr";
import React, { useEffect, useRef, useState } from "react";
import ReceiptView from "./RecieptView";

const demoReceipt:Receipt = {
  date: "2021-10-10",
  commodities: [
    {
      id: "1",
      name: "apple",
      price: 100,
      count: 3
    },
    {
      id: "2",
      name: "banana",
      price: 50,
      count: 5
    }
  ],
  publisherName: "hoge_hoge_store",
  totalPrice: 550,
  publisherAddress: "hoge_hoge_land"
}

const QrCodeScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("useEffect")
    const constants = {
      video: {
        facingMode: "environment",
        width: { ideal: 300 },
        height: { ideal: 300 },
      },
    };

    //メディアデバイスのアクセス許可の取得
    navigator.mediaDevices
      .getUserMedia(constants)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          const playPromise = videoRef.current.play();

          //play()がPromiseを返すためthen,catchで処理を行う
          if (playPromise !== undefined) {
            console.log("playPromise");
            playPromise
              .then((_) => {
                scanQrCode();
              })
          }
        }
      })
      .catch((err) => {
        console.error("Error accessing media devices:", err);
      });

    const currentVideoRef = videoRef.current;

    return () => {
      if (currentVideoRef?.srcObject) {
        const stream = currentVideoRef.srcObject as MediaStream;
        const tracks = stream.getTracks();
        for (const track of tracks) {
          track.stop();
        }
      }
    };
  }, []);

  const scanQrCode = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const ctx = canvas.getContext("2d"); // 2dコンテキストを取得
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // canvasにvideoのスナップショットを描画
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); //pixelデータを取得
        const qrCodeData = jsQR(
          //QRコードのデータを取得
          imageData.data,
          imageData.width,
          imageData.height
        );
        if (qrCodeData) {
          if (qrCodeData.data === "http://localhost:3000/result") {
            console.log(qrCodeData.data);
            setError("Invalid QR Code");
            setTimeout(scanQrCode, 100);
            return;
          }
          setResult(qrCodeData.data);
          console.log(qrCodeData.data);
          return;
        }
        setTimeout(scanQrCode, 100);
      }
    }
  };

  const resetFunc = () => {
    setResult("");
    setError("");
  }

  return (
    <div>
      {!result && (
        <div className="flex justify-center">
          <div className="relative h-[300px] w-[300px]">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute left-0 top-0 -z-50 h-[300px] w-[300px]"
            >
              <track kind="captions" />
            </video>
            <canvas
              ref={canvasRef}
              width="300"
              height="300"
              className="absolute left-0 top-0"
            />
          </div>
        </div>
      )}
      {result && (
        <div className="flex justify-center">
          <ReceiptView receipt={demoReceipt} resetFunc={resetFunc}/>
        </div>
      )}
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default QrCodeScanner;
