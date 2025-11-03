import React from 'react'

type Props = {
  open: boolean
  level: number
  need: number
  have: number
  blocked?: boolean
  onSave: () => void
  onGiveUp: () => void
}

const FailModal: React.FC<Props> = ({ open, level, need, have, blocked = false, onSave, onGiveUp }) => {
  if (!open) return null
  const canSave = !blocked && have >= need
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative w-[92%] max-w-md rounded-xl border border-neutral-700 bg-neutral-900 text-neutral-100 p-4 shadow-xl">
        <h3 className="text-xl font-bold mb-1">강화 실패!</h3>
        <p className="text-neutral-300 mb-3">현재 레벨 +{level} 고양이가 쓰러졌어요.</p>
        <div className="rounded-lg bg-neutral-800 p-3 mb-3">
          {blocked ? (
            <p className="text-red-300">이 구간은 방지권 사용이 불가합니다.</p>
          ) : (
            <>
              <p className="mb-1">살리려면 방지권이 필요해요.</p>
              <p>
                필요: <b>{need}</b>장 • 보유: <b>{have}</b>장
              </p>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <button className={`flex-1 px-4 py-2 rounded-md font-semibold ${canSave ? 'bg-emerald-400 text-black' : 'bg-neutral-700 text-neutral-400 cursor-not-allowed'}`} disabled={!canSave} onClick={onSave}>
            {blocked ? '사용 불가' : '방지권 사용해 살리기'}
          </button>
          <button
            className="px-4 py-2 rounded-md border border-neutral-600 hover:border-neutral-400"
            onClick={onGiveUp}
          >
            포기하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default FailModal
