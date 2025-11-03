import React from 'react'

type Props = {
  open: boolean
  name: string
  src: string
  desc: string
  onClose: () => void
}

const CatModal: React.FC<Props> = ({ open, name, src, desc, onClose }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-[92%] max-w-md rounded-xl border border-neutral-700 bg-neutral-900 text-neutral-100 p-4 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">{name}</h3>
          <button className="px-2 py-1 text-sm border border-neutral-600 rounded-md" onClick={onClose}>닫기</button>
        </div>
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
          <img className="absolute inset-0 w-full h-full object-cover" src={src} alt={name} />
        </div>
        <p className="text-sm text-neutral-300 whitespace-pre-line">{desc}</p>
      </div>
    </div>
  )
}

export default CatModal

