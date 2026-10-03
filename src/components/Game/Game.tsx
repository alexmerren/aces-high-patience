import type { FC } from "react";
import type { Deck } from "../../types";

interface Props {
    deck: Deck
}

const Game: FC<Props> = ({ deck }) => {
    return (
        <>
            <code>
                {JSON.stringify(deck)}
            </code>
        </>
    );
}

export default Game;