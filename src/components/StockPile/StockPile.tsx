import React from "react";

interface StockPileProps {
  remainingCards: number;
  onDraw: () => void;
}

const StockPile: React.FC<StockPileProps> = ({ remainingCards, onDraw }) => {
  const isEmpty = remainingCards === 0;

  return (
    <div>
      <span>Stock ({remainingCards})</span>
      <button
        onClick={onDraw}
        disabled={isEmpty}
      >
        {isEmpty ? "Empty" : "DRAW"}
      </button>
    </div>
  );
};

export default StockPile;