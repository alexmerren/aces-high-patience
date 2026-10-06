import { type FC } from "react";
import { useDraggable } from '@dnd-kit/core';
import { getCardColour, getCardSymbol } from "./utils";
import type { Card } from "../../types";
import { fromCardToIndex } from "../../lib/card_util";

interface PlayingCardProps {
  card: Card;
  columnIndex: number;
  isTopCard: boolean;
  onClick?: () => void;
}

const PlayingCard: FC<PlayingCardProps> = ({ card, columnIndex, isTopCard, onClick }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: fromCardToIndex(card),
    data: { card, sourceColumnIndex: columnIndex },
    disabled: !isTopCard, // Only top card of a column is draggable
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...(isTopCard ? listeners : {})}
      onClick={onClick}
      className={`${isDragging ? "opacity-40" : "opacity-100"} ${getCardColour(card)}`}
    >
      <div>
        {card.rank}
        <span>{getCardSymbol(card)}</span>
      </div>
    </div>
  );
};

export default PlayingCard