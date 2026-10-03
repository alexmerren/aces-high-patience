import { createFileRoute, Link } from '@tanstack/react-router'
import type { FC } from 'react';
import { createRandomCode } from '../lib/game_util';

interface Props { }

const HomePage: FC<Props> = () => {

  return (
    <>
      Play Random Game: <Link to={"/play"} search={{
        code: createRandomCode(),
      }}><button>Go</button></Link>
    </>
  );
};

export const Route = createFileRoute('/')({
  component: HomePage,
})
