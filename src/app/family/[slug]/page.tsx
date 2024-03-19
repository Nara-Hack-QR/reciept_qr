import React from "react";

const Family = ({ params }: { params: { slug: string } }) => {
  const json = decodeURIComponent(atob(params.slug).replace(/-/g, "+").replace(/_/g, "/"));
  const receipt = JSON.parse(json) as Receipt;
  return <article className="flex flex-col items-center">
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
</article>;
};

export default Family;
