import React from 'react'

type Props = {
  bestLevel: number
  protect: number
  money: number
  onBuyProtect: (cnt: number, price: number) => void
  onWarp: (level: number, price: number) => void
}

function coin(n: number) { return n.toLocaleString('ko-KR') }

const ShopPage: React.FC<Props> = ({ bestLevel, protect, money, onBuyProtect, onWarp }) => {
  return (
    <main className="text-left">
      <h2 className="text-xl font-bold">상점</h2>
      <div className="grid gap-2 mt-3">
        <button className="flex justify-between items-center p-3 border border-neutral-700 rounded-lg hover:border-neutral-500 text-left" onClick={() => onWarp(9, 120_000)}>
          <div>+9강 워프권</div>
          <div className="opacity-80">120,000원</div>
        </button>
        <button className="flex justify-between items-center p-3 border border-neutral-700 rounded-lg hover:border-neutral-500 text-left" onClick={() => onWarp(11, 300_000)}>
          <div>+11강 워프권</div>
          <div className="opacity-80">300,000원</div>
        </button>
        <button className="flex justify-between items-center p-3 border border-neutral-700 rounded-lg hover:border-neutral-500 text-left" onClick={() => onWarp(13, 700_000)}>
          <div>+13강 워프권</div>
          <div className="opacity-80">700,000원</div>
        </button>
        <button className="flex justify-between items-center p-3 border border-neutral-700 rounded-lg hover:border-neutral-500 text-left" onClick={() => onBuyProtect(1, 20_000)}>
          <div>깨짐 방지권 × 1</div>
          <div className="opacity-80">20,000원</div>
        </button>
        <button className="flex justify-between items-center p-3 border border-neutral-700 rounded-lg hover:border-neutral-500 text-left" onClick={() => onBuyProtect(3, 55_000)}>
          <div>깨짐 방지권 × 3</div>
          <div className="opacity-80">55,000원</div>
        </button>
        <button className="flex justify-between items-center p-3 border border-neutral-700 rounded-lg hover:border-neutral-500 text-left" onClick={() => onBuyProtect(5, 85_000)}>
          <div>깨짐 방지권 × 5</div>
          <div className="opacity-80">85,000원</div>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
        <div>최고 레벨: +{bestLevel}</div>
        <div>방지권: {protect}</div>
        <div>돈: {coin(money)}</div>
      </div>
    </main>
  )
}

export default ShopPage
