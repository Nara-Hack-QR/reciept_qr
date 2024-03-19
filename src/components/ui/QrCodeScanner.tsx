"use client";

import jsQR from "jsqr";
import React, { useEffect, useRef, useState } from "react";
import ReceiptView from "./RecieptView";

const demoReceipt: Receipt = {
  date: "2021-10-10",
  commodities: [
    {
      id: "1",
      name: "apple",
      price: 100,
      count: 3,
    },
    {
      id: "2",
      name: "banana",
      price: 50,
      count: 5,
    },
  ],
  publisherName: "hoge_hoge_store",
  totalPrice: 550,
  publisherAddress: "hoge_hoge_land",
};

const QrCodeScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState<Receipt|null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    startScanner();
  }, []);

  const startScanner = () => {
    console.log("useEffect");
    const constants = {
      video: {
        facingMode: "environment",
        width: { ideal: 350 },
        height: { ideal: 350 },
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
            playPromise.then((_) => {
              scanQrCode();
            });
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
  };

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
          //TODO validation
          if (qrCodeData.data === "") {
            console.log(qrCodeData.data);
            setError("QRコードに間違いがある可能性があります。");
            setTimeout(scanQrCode, 100);
            return;
          }
          const decodedData = JSON.parse(qrCodeData.data) as Receipt;
          setResult(decodedData);
          return;
        }
        setTimeout(scanQrCode, 10);
      }
    }
  };

  const resetFunc = () => {
    setResult(null);
    setError("");
    startScanner();
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {!result && (
        <div className="flex justify-center">
          <div className="relative h-[350px] w-[350px]">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute left-0 top-0 -z-50 h-[350px] w-[350px]"
            >
              <track kind="captions" />
            </video>
            <canvas
              ref={canvasRef}
              width="350"
              height="350"
              className="absolute left-0 top-0"
            />
          </div>
        </div>
      )}
      {result && (
        <div className="flex justify-center">
          <ReceiptView receipt={result} resetFunc={resetFunc} />
        </div>
      )}
      {!result && (<p className="text-center text-xl font-bold">QRコードを画面の中央に写してください</p>)}
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default QrCodeScanner;
