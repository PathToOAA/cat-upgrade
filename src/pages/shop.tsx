import React from 'react'
import { PROTECT_PACKS, warpPrice } from '../game/balance'

type Props = {
  bestLevel: number
  protect: number
  money: number
  onBuyProtect: (cnt: number, price: number) => void
  onWarp: (level: number, price: number) => void
}

function coin(n: number) { return n.toLocaleString('ko-KR') }

const ShopPage: React.FC<Props> = ({ bestLevel, protect, money, onBuyProtect, onWarp }) => {
  const warp9 = warpPrice(9)
  const warp11 = warpPrice(11)
  const warp13 = warpPrice(13)
  return (
    <main className="text-left text-black">
      <h2 className="text-xl font-bold">상점</h2>
      <div className="grid gap-2 mt-3">
        <button className="flex justify-between items-center p-3 border border-neutral-700 rounded-lg hover:border-neutral-500 text-left" onClick={() => onWarp(9, warp9)}>
          <div>+9강 워프권</div>
          <div className="opacity-80">{coin(warp9)}원</div>
        </button>
        <button className="flex justify-between items-center p-3 border border-neutral-700 rounded-lg hover:border-neutral-500 text-left" onClick={() => onWarp(11, warp11)}>
          <div>+11강 워프권</div>
          <div className="opacity-80">{coin(warp11)}원</div>
        </button>
        <button className="flex justify-between items-center p-3 border border-neutral-700 rounded-lg hover:border-neutral-500 text-left" onClick={() => onWarp(13, warp13)}>
          <div>+13강 워프권</div>
          <div className="opacity-80">{coin(warp13)}원</div>
        </button>
        {PROTECT_PACKS.map(p => (
          <button key={p.count} className="flex justify-between items-center p-3 border border-neutral-700 rounded-lg hover:border-neutral-500 text-left" onClick={() => onBuyProtect(p.count, p.price)}>
            <div>깨짐 방지권 × {p.count}</div>
            <div className="opacity-80">{coin(p.price)}원</div>
          </button>
        ))}
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

