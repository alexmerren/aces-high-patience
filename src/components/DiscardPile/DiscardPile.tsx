import React from "react";
import { useDroppable } from "@dnd-kit/core";
import type { Card } from "../../types";
import { PlayingCard } from "../PlayingCard";

interface DiscardPileProps {
  cards: Card[];
}

const DiscardPile: React.FC<DiscardPileProps> = ({ cards }) => {
  const { setNodeRef } = useDroppable({
    id: "discard-pile",
  });

  const topCard = cards[cards.length - 1];

  return (
    <div>
      <span>Discard ({cards.length})</span>
      <div
        ref={setNodeRef}
      >
        {topCard ? (
          <PlayingCard card={topCard} columnIndex={0} isTopCard={false} />
        ) : (
          <span >Drop Here</span>
        )}
      </div>
    </div>
  );
};

export default DiscardPile;