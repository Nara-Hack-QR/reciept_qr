import React from "react";

const Family = ({ params }: { params: { slug: string } }) => {
  //paramsのはじめと終わりの括弧を取り除く
  const newParams = params.slug.slice(1, -1);
  const json = decodeURIComponent(
    atob(newParams)
  );
  const receipt = JSON.parse(json) as Receipt;
  return (
    <article className="flex flex-col items-center gap-5 my-5">
      <p className="text-2xl font-bold">今回のお買い物</p>
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
    </article>
  );
};

export default Family;
