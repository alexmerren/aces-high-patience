import { useSearch } from "@tanstack/react-router";
import { useMemo, type FC } from "react";
import { AcesHighGame } from "../../components/AcesHighGame";
import { getDeckFromCode } from "../../lib/game_util";

const AcesHighPage: FC = () => {
  const search = useSearch({ strict: false });
  const { code } = search;

  const deck = useMemo(() => getDeckFromCode(code), [code])

  return (
    <AcesHighGame deck={deck} />
  );
};

export default AcesHighPage;