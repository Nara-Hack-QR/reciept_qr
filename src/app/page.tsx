'use client';
import HistoryButton from "@/components/ui/HistoryButton";
import QrCodeScanner from "@/components/ui/QrCodeScanner";
import ReadReceiptButton from "@/components/ui/ReadReceiptButton";

const Home = () => {
  const handleReadReceipt = () => {
    console.log('pressed');
  }

  return (
    <main className="flex flex-col items-center py-10 gap-5">
      <h1 className="text-[30px]">読み込み</h1>
      <QrCodeScanner />
      <ReadReceiptButton handleClick={handleReadReceipt} />
      <HistoryButton />
    </main>
  );
};

export default Home;
