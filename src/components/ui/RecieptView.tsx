import React, { type FC } from 'react'
import { Button } from '@/components/ui/button';

type ReceiptViewProps = {
    receipt : Receipt
    resetFunc: () => void
}

const ReceiptView:FC<ReceiptViewProps> = ({
    receipt,
    resetFunc
}) => {
  return (
    <article className='flex flex-col items-center'>
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
        <Button variant={"outline"} onClick={resetFunc}>戻る</Button>
    </article>
  )
}

export default ReceiptView
