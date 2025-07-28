import Image from "next/image";
import { TEAMS } from "@/utils/const";
import { GameType } from "@/utils/types";

import styles from "../../styles/home.module.css";

const GameBox = ({ game }: { game: GameType }) => {
  const team1 = TEAMS[game.team1];
  const team2 = TEAMS[game.team2];

  return (
    <a
      target="_blank"
      href={`https://npb.jp/${game.gameLink}`}
      rel="noopener noreferrer"
    >
      <div className="column is-12-mobile">
        <div
          className={`box s-flex is-flex-direction-column is-align-items-center is-justify-content-center ${styles["game-box-font"]}`}
          style={{
            height: 210,
            background: `linear-gradient(110deg, 
          ${team1.color} 0%, 
          ${team1.color} 50%, 
          ${team2.color} 50%, 
          ${team2.color} 100%)`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
              padding: 20,
            }}
          >
            <a target="_blank" href={team1.link} rel="noopener noreferrer">
              <Image
                src={team1.svgUrl}
                alt={game.team1}
                width={80}
                height={80}
              />
            </a>
            <span style={{ width: 100 }}>
              {game.score1} - {game.score2}
            </span>
            <a target="_blank" href={team2.link} rel="noopener noreferrer">
              <Image
                src={team2.svgUrl}
                alt={game.team2}
                width={80}
                height={80}
              />
            </a>
          </div>
          <div style={{ fontSize: 14 }}>{game.state}</div>
        </div>
      </div>
    </a>
  );
};

export default GameBox;
