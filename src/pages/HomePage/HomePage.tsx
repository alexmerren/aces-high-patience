import type { FC } from "react";
import { createRandomCode } from "../../lib/game_util";
import { Link } from "@tanstack/react-router";

const HomePage: FC = () => {
  return (
    <>
      Random Aces-High Game: <Link to={"/aces-high"} search={{
        code: createRandomCode(),
      }}><button>Go</button></Link>
    </>
  );
};

export default HomePage