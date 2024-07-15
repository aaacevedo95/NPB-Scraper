import GameBox from "./GameBox";

import { GameType } from "@/utils/types";

const GamesList = ({ gamesList }: { gamesList: GameType[] }) => (
  <div className="columns is-multiline is-centered">
    {gamesList.length === 0 ? (
      <p className="has-text-centered is-size-4">No Games</p>
    ) : (
      gamesList.map((game, idx) => <GameBox key={idx} game={game} />)
    )}
  </div>
);

export default GamesList;
