import React from "react";
import { useDroppable } from "@dnd-kit/core";
import type { Card } from '../../types'
import { PlayingCard } from "../PlayingCard";
import { fromCardToIndex } from "../../lib/card_util";

interface ColumnProps {
  columnIndex: number;
  cards: Card[];
  onTopCardClick?: (columnIndex: number) => void;
}

const Column: React.FC<ColumnProps> = ({
  columnIndex,
  cards,
  onTopCardClick,
}) => {
  const { setNodeRef } = useDroppable({
    id: `column-${columnIndex}`,
    data: { columnIndex },
  });

  return (
    <div
      ref={setNodeRef} >
      {cards.map((card, idx) => {
        const isTop = idx === cards.length - 1;
        return (
          <div key={fromCardToIndex(card)} >
            <PlayingCard
              card={card}
              columnIndex={columnIndex}
              isTopCard={isTop}
              onClick={() => isTop && onTopCardClick?.(columnIndex)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Column;