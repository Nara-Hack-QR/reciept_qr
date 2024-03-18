'use client';
import HistoryButton from "@/components/ui/HistoryButton";
import QrCodeScanner from "@/components/ui/QrCodeScanner";
import ReadReceiptButton from "@/components/ui/ReadReceiptButton";

const Home = () => {

  return (
    <main className="flex flex-col items-center py-10 gap-5">
      <h1 className="text-[30px]">読み込み</h1>
      <QrCodeScanner />
      <HistoryButton />
    </main>
  );
};

export default Home;
