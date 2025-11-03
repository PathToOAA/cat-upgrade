import { useEffect, useMemo, useState } from 'react'
import UpgradePage from './pages/upgrade'
import ShopPage from './pages/shop'
import CollectionPage from './pages/collection'
import FailModal from './components/FailModal'
import FooterBar from './components/FooterBar'
import { MAX_LEVEL, PROTECT_REQUIRED, START_MONEY, SUCCESS_RATES, UPGRADE_COSTS } from './game/balance'

type Tab = 'shop' | 'upgrade' | 'collection'

type SaveData = {
  money: number
  level: number
  protect: number
  bestLevel: number
}

const K = { startMoney: START_MONEY, startProtect: 3 }

const catPics: string[] = [
  '/wash_cat.png','/t_cat.png','/bird_cat.png','/club_cat.png','/cool_cat.png','/sock_cat.png','/bbong_cat.png','/coke_cat.png','/gavity_cat.png','/good_cat.png','/cup_cat.png','/lee_cat.png','/mozza_cat.png','/ninja_cat.png','/poop_cat.png','/sleep_cat.png','/theif_cat.png','/dino_cat.png','/dae_cat.png','/health_cat.png','/heap_cat.png','/eye_cat.png'
]

function coin(n: number) { return n.toLocaleString('ko-KR') }

function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem('cat-upgrade-save')
    if (!raw) throw new Error('no save')
    const s = JSON.parse(raw) as SaveData
    return { money: s.money ?? K.startMoney, level: s.level ?? 0, protect: s.protect ?? K.startProtect, bestLevel: s.bestLevel ?? 0 }
  } catch {
    return { money: K.startMoney, level: 0, protect: K.startProtect, bestLevel: 0 }
  }
}

function useAutoSave(state: SaveData) { useEffect(() => { localStorage.setItem('cat-upgrade-save', JSON.stringify(state)) }, [state]) }

function App() {
  const [tab, setTab] = useState<Tab>('upgrade')
  const [save, setSave] = useState<SaveData>(() => loadSave())
  useAutoSave(save)
  const [failOpen, setFailOpen] = useState(false)
  const [failNeed, setFailNeed] = useState(0)

  const cost = useMemo(() => (save.level >= MAX_LEVEL ? Infinity : (UPGRADE_COSTS[save.level] ?? Infinity)), [save.level])
  const successRate = useMemo(() => SUCCESS_RATES[Math.min(save.level, SUCCESS_RATES.length - 1)], [save.level])
  const needProtect = useMemo(() => PROTECT_REQUIRED[Math.min(save.level, PROTECT_REQUIRED.length - 1)] ?? 0, [save.level])

  function tryUpgrade() {
    if (save.level >= MAX_LEVEL) { alert('엔딩에 도달했습니다! (eye_cat)'); return }
    if (save.money < cost) return alert('돈이 부족합니다!')
    const nextMoney = save.money - cost
    const roll = Math.random() * 100
    if (roll < successRate) {
      const nextLevel = save.level + 1
      setSave(s => ({ ...s, money: nextMoney, level: nextLevel, bestLevel: Math.max(s.bestLevel, nextLevel) }))
    } else {
      setSave(s => ({ ...s, money: nextMoney }))
      setFailNeed(needProtect)
      setFailOpen(true)
    }
  }

  function sellCat() {
    if (save.level === 0) return alert('0강은 판매할 수 없어요!')
    const get = save.level * save.level * 1_500
    if (!confirm(`고양이를 판매할까요? +${save.level} → ${coin(get)}원`)) return
    setSave(s => ({ ...s, money: s.money + get, level: 0 }))
  }

  function buyProtect(cnt: number, price: number) {
    if (save.money < price) return alert('돈이 부족합니다!')
    setSave(s => ({ ...s, money: s.money - price, protect: s.protect + cnt }))
  }

  function warpTo(level: number, price: number) {
    if (save.money < price) return alert('돈이 부족합니다!')
    const target = Math.min(level, MAX_LEVEL)
    setSave(s => ({ ...s, money: s.money - price, level: target, bestLevel: Math.max(s.bestLevel, target) }))
  }

  function saveCatWithProtect() {
    if (failNeed <= 0) { setFailOpen(false); return }
    if (save.protect < failNeed) { alert('방지권이 부족합니다!'); return }
    setSave(s => ({ ...s, protect: s.protect - failNeed }))
    setFailOpen(false)
  }

  function giveUpCat() { setSave(s => ({ ...s, level: 0 })); setFailOpen(false) }

  return (
    <div className="w-full bg-white max-w-[420px] mx-auto px-4 pt-3 min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-inherit pb-2 mb-2 ">
        <div className="flex gap-1 justify-between">
          {(['shop','upgrade','collection'] as Tab[]).map(t => (
            <button key={t} className={`flex-1 py-3 font-bold text-base ${tab===t? 'bg-[#d9d9d9]':'bg-inherit'}`} onClick={() => setTab(t)}>
              {t==='shop'?'상점':t==='upgrade'?'강화':'도감'}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1">
        {tab==='upgrade' && (
          <UpgradePage level={save.level} protect={save.protect} money={save.money} cost={cost} successRate={successRate} catPics={catPics} onTryUpgrade={tryUpgrade} onSell={sellCat} />
        )}
        {tab==='shop' && (
          <ShopPage bestLevel={save.bestLevel} protect={save.protect} money={save.money} onBuyProtect={buyProtect} onWarp={warpTo} />
        )}
        {tab==='collection' && (
          <CollectionPage bestLevel={save.bestLevel} money={save.money} />
        )}
      </div>

      <FooterBar level={save.level} protect={save.protect} money={save.money} />

      <FailModal open={failOpen} level={save.level} need={failNeed} have={save.protect} blocked={failNeed <= 0} onSave={saveCatWithProtect} onGiveUp={giveUpCat} />
    </div>
  )
}

export default App

