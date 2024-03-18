import React, { type FC } from "react";
import { Button } from "@/components/ui/button";
import { LineIcon, LineShareButton } from "react-share";

type ReceiptViewProps = {
  receipt: Receipt;
  resetFunc: () => void;
};

function base64url_encode(buffer: ArrayBuffer): string {
  return btoa(
    Array.from(new Uint8Array(buffer), (b) => String.fromCharCode(b)).join("")
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64url_decode(value: string): ArrayBuffer {
  const m = value.length % 4;
  return Uint8Array.from(
    atob(
      value
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(value.length + (m === 0 ? 0 : 4 - m), "=")
    ),
    (c) => c.charCodeAt(0)
  ).buffer;
}

const ReceiptView: FC<ReceiptViewProps> = ({ receipt, resetFunc }) => {
  const receiptJson = JSON.stringify(receipt);
  const utf8BytesReceipt = new TextEncoder().encode(receiptJson);
  const base64UrlReceipt = base64url_encode(utf8BytesReceipt);
  return (
    <article className="flex flex-col items-center">
      <h1>レシート</h1>
      <p>日付: {receipt.date}</p>
      <p>販売店名: {receipt.publisherName}</p>
      <p>販売店住所: {receipt.publisherAddress}</p>
      <table>
        <thead>
          <tr>
            <th>名前</th>
            <th>価格</th>
            <th>個数</th>
          </tr>
        </thead>
        <tbody>
          {receipt.commodities.map((commodity) => (
            <tr key={commodity.id}>
              <td>{commodity.name}</td>
              <td>{commodity.price}円</td>
              <td>{commodity.count}点</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Price: {receipt.totalPrice}円</p>
      <div className="bg-gray-400">
        <LineShareButton
          className="flex items-center gap-2"
          url={`https://https://reciept-qr.vercel.app/famiily/${base64UrlReceipt}`}
          title="HOGE"
        >
          <LineIcon size={24} round />
          <p className="text-2xl">LINEで家族に送信する</p>
        </LineShareButton>
      </div>
      <Button variant={"outline"} onClick={resetFunc}>
        戻る
      </Button>
    </article>
  );
};

export default ReceiptView;
