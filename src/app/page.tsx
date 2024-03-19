'use client';
import CameraFrame from "@/components/ui/CameraFrame";
import HistoryButton from "@/components/ui/HistoryButton";
import QrCodeScanner from "@/components/ui/QrCodeScanner";
import { useState } from "react";

const Home = () => {
  const [isStarted, setIsStarted] = useState(false);
  const handleClickCamera = () => {
    setIsStarted(true);
  }

  return (
    <main className="flex flex-col items-center py-10 gap-5">
      <h1 className="text-[30px] font-bold">読み込み</h1>
      {isStarted ? (<QrCodeScanner />):(<CameraFrame handleClick={handleClickCamera}/>)}
    </main>
  );
};

export default Home;
