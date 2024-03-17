"use client";

import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  const handleReadReceipt = () => {
    console.log("Read Receipt");
  };
  return (
    <main className="flex flex-col items-center py-10 gap-5">
      <h1 className="text-[30px]">読み込み</h1>
      <article className="w-[90%] h-[450px] bg-gray-500">Camera Field</article>
      <Button variant={"outline"} onClick={handleReadReceipt}>
        レシートを読み込む
      </Button>
      <Button variant={"outline"}>
        <Link href="/history">履歴</Link>
      </Button>
    </main>
  );
};

export default Home;
