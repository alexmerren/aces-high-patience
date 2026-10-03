import { createFileRoute, useSearch } from '@tanstack/react-router'
import { type FC, useMemo } from 'react';
import { Game } from '../components/Game';
import { getDeckFromCode } from '../lib/game_util';

interface Props { }

const PlayPage: FC<Props> = () => {
  const search = useSearch({ strict: false });
  const { code } = search;

  const deck = useMemo(() => getDeckFromCode(code), [code])

  return (
    <Game deck={deck} />
  );
};

export const Route = createFileRoute('/play')({
  component: PlayPage,
})