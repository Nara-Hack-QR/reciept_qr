import React, { type FC } from "react";
import { Button } from "@/components/ui/button";
import { LineIcon, LineShareButton } from "react-share";

type ReceiptViewProps = {
  receipt: Receipt;
  resetFunc: () => void;
};

const ReceiptView: FC<ReceiptViewProps> = ({ receipt, resetFunc }) => {
  const json = encodeURIComponent(JSON.stringify(receipt));
  const base64url = btoa(json).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return (
    <article className="flex flex-col items-center gap-5">
      <div className="border border-slate-400 py-3 w-[350px] flex flex-col items-center text-lg font-bold gap-5 h-[600px]">
        <h1>レシート</h1>
        <p>日付: {receipt.date}</p>
        <p>販売店名: {receipt.publisherName}</p>
        <p>販売店住所: {receipt.publisherAddress}</p>
        <table className="w-[90%] border border-collapse">
          <thead>
            <tr>
              <th className="border-2 border-gray-700">名前</th>
              <th className="border-2 border-gray-700">価格</th>
              <th className="border-2  border-gray-700">個数</th>
            </tr>
          </thead>
          <tbody>
            {receipt.commodities.map((commodity) => (
              <tr key={commodity.id} className="odd:bg-white even:bg-slate-100">
                <td className="text-start">{commodity.name}</td>
                <td className="text-end">{commodity.price}円</td>
                <td className="text-end">{commodity.count}点</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>合計金額: {receipt.totalPrice}円</p>
      </div>
      <div className="bg-green-200 px-2 py-4 rounded-sm">
        <LineShareButton
          className="flex items-center gap-2"
          url={`https://reciept-qr.vercel.app/family/(${base64url})`}
          title="HOGE"
        >
          <LineIcon size={24} round />
          <p className="text-2xl">LINEで家族に送信する</p>
        </LineShareButton>
      </div>
      <Button variant={"outline"} onClick={resetFunc} className="font-bold text-xl">
        戻る
      </Button>
    </article>
  );
};

export default ReceiptView;
