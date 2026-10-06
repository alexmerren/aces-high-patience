import { type Card, type Deck } from "../../types";
import { isEligibleForDiscard } from "./utils";
import { useState, useMemo, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { Column } from "../Column";
import { StockPile } from "../StockPile";
import { DiscardPile } from "../DiscardPile";
import { PlayingCard } from "../PlayingCard";

const NUM_COLUMNS = 4;

interface AcesHighGameProps {
  deck: Deck,
}

const AcesHighGame: React.FC<AcesHighGameProps> = ({ deck: initialDeck }) => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [columns, setColumns] = useState<Card[][]>([]);
  const [discardPile, setDiscardPile] = useState<Card[]>([]);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  // Configure pointer sensor with activation distance to prevent accidental drags on click
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  )

  // Run initial game setup
  useEffect(() => {
    const initialCols: Card[][] = Array.from({ length: NUM_COLUMNS }, () => []);
    setColumns(initialCols);

    setDeck(initialDeck);
    setDiscardPile([]);
  }, []);

  // Compute top card for each column
  const topCards = useMemo(() => {
    return columns.map((col) => (col.length > 0 ? col[col.length - 1] : null));
  }, [columns]);

  // Handle Draw Action
  const handleDraw = () => {
    if (deck.length === 0) return;

    const newStock = [...deck];
    const newColumns = columns.map((col) => [...col]);

    for (let i = 0; i < newColumns.length; i++) {
      const card = newStock.pop();
      if (card) {
        newColumns[i].push(card);
      }
    }

    setDeck(newStock);
    setColumns(newColumns);
  };

  // Helper to discard top card of a specific column
  const discardTopCard = (colIdx: number) => {
    const cardToDiscard = topCards[colIdx];
    if (!cardToDiscard) return;

    if (isEligibleForDiscard(cardToDiscard, topCards)) {
      setColumns((prev) =>
        prev.map((col, idx) => (idx === colIdx ? col.slice(0, -1) : col))
      );
      setDiscardPile((prev) => [...prev, cardToDiscard]);
    }
  };

  // Drag Handlers
  const handleDragStart = (event: DragStartEvent) => {
    const card = event.active.data.current?.card as Card;
    if (card) setActiveCard(card);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const sourceColIndex = active.data.current?.sourceColumnIndex as number;
    const activeCardData = active.data.current?.card as Card;

    if (sourceColIndex === undefined || !activeCardData) return;

    const targetId = String(over.id);

    // Case 1: Dropped into Discard Pile
    if (targetId === "discard-pile") {
      if (isEligibleForDiscard(activeCardData, topCards)) {
        setColumns((prev) =>
          prev.map((col, idx) => (idx === sourceColIndex ? col.slice(0, -1) : col))
        );
        setDiscardPile((prev) => [...prev, activeCardData]);
      }
      return;
    }

    // Case 2: Dropped onto another Column (must be empty)
    if (targetId.startsWith("column-")) {
      const destColIndex = Number(targetId.replace("column-", ""));

      if (destColIndex !== sourceColIndex && columns[destColIndex].length === 0) {
        setColumns((prev) =>
          prev.map((col, idx) => {
            if (idx === sourceColIndex) return col.slice(0, -1);
            if (idx === destColIndex) return [...col, activeCardData];
            return col;
          })
        );
      }
    }
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div>
        <div>
          <StockPile remainingCards={deck.length} onDraw={handleDraw} />
          <DiscardPile cards={discardPile} />
        </div>

        <div>
          {columns.map((colCards, idx) => (
            <Column
              key={idx}
              columnIndex={idx}
              cards={colCards}
              onTopCardClick={discardTopCard}
            />
          ))}
        </div>
      </div>

      <DragOverlay>{activeCard ? <PlayingCard card={activeCard} columnIndex={0} isTopCard={false} /> : null}</DragOverlay>
    </DndContext>
  );
};

export default AcesHighGame;
