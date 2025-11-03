import React from "react";

type Props = {
  level: number;
  protect: number;
  money: number;
};

function coin(n: number) {
  return n.toLocaleString("ko-KR");
}

const FooterBar: React.FC<Props> = ({ level, protect, money }) => {
  return (
    <footer className="mt-auto sticky bottom-0 bg-white/95 backdrop-blur border-t border-neutral-200  py-3">
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>레벨: +{level}</div>
        <div>방지권: {protect}</div>
        <div className="text-right">돈: {coin(money)}</div>
      </div>
    </footer>
  );
};

export default FooterBar;
