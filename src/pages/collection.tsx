import React, { useState } from 'react'
import { cats } from '../data/cats'
import CatModal from '../components/CatModal'

type Props = {
  bestLevel: number
  money: number
}

function coin(n: number) { return n.toLocaleString('ko-KR') }

const CollectionPage: React.FC<Props> = ({ bestLevel, money }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <main className="text-left">
      <h2 className="text-xl font-bold">도감</h2>
      <div className="grid grid-cols-3 gap-2">
        {cats.map((cat, i) => {
          const unlocked = bestLevel >= i
          return (
            <button key={i} className="relative aspect-square" onClick={() => unlocked && setOpenIndex(i)}>
              <img className={`absolute inset-0 w-full h-full object-cover rounded-lg ${unlocked ? '' : 'grayscale brightness-75'}`} src={cat.src} alt={`cat-${i}`} />
              <span className="absolute bottom-1 right-1 bg-black/60 px-2 py-0.5 rounded-full text-xs">+{i}</span>
            </button>
          )
        })}
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
        <div>최고 레벨: +{bestLevel}</div>
        <div></div>
        <div>돈: {coin(money)}</div>
      </div>

      <CatModal
        open={openIndex !== null}
        name={openIndex !== null ? cats[openIndex].name : ''}
        src={openIndex !== null ? cats[openIndex].src : ''}
        desc={openIndex !== null ? cats[openIndex].desc : ''}
        onClose={() => setOpenIndex(null)}
      />
    </main>
  )
}

export default CollectionPage

