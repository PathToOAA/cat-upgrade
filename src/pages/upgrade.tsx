import React from "react";

type Props = {
  level: number;
  protect: number;
  money: number;
  cost: number;
  successRate: number;
  catPics: string[];
  onTryUpgrade: () => void;
  onSell: () => void;
};

function coin(n: number) {
  return n.toLocaleString("ko-KR");
}

const UpgradePage: React.FC<Props> = ({
  level,
  cost,
  successRate,
  catPics,
  onTryUpgrade,
  onSell,
}) => {
  return (
    <main className="text-left">
      <h1 className="mt-1 mb-1 text-2xl font-bold">고양이 강화하기</h1>
      <p className="text-neutral-500 mb-2">
        성공률 {successRate}% • 비용 {coin(cost)}원
      </p>
      <div className="w-full relative aspect-3/4 rounded-lg overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={catPics[level % catPics.length]}
          alt="cat"
        />
      </div>
      <div className="flex gap-2 my-4">
        <button
          className="px-4 py-2 rounded-md bg-emerald-400 text-black font-bold inline-flex items-center"
          onClick={onTryUpgrade}
        >
          <img
            src="/button_cat.png"
            alt="강화 고양이"
            className="h-6 w-6 mr-2 rounded-full"
          />
          강화하기
        </button>
        <button
          className="px-4 py-2 rounded-md border border-neutral-700 hover:border-neutral-500"
          onClick={onSell}
        >
          판매
        </button>
      </div>
      {/* 상태는 전역 푸터에서 공통 표기 */}
    </main>
  );
};

export default UpgradePage;
