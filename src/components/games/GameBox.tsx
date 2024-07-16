import Image from "next/image";
import { TEAM_COLORS, TEAM_LINKS } from "@/utils/const";
import { GameType } from "@/utils/types";

import styles from "../../styles/home.module.css";

const GameBox = ({ game }: { game: GameType }) => (
  <a
    target="_blank"
    href={`https://npb.jp/${game.gameLink}`}
    rel="noopener noreferrer"
  >
    <div className="column is-12-mobile">
      <div
        className={`box is-flex is-flex-direction-column is-align-items-center is-justify-content-center ${styles["game-box-font"]}`}
        style={{
          height: 210,
          background: `linear-gradient(110deg, 
          ${TEAM_COLORS[game.team1]} 0%, 
          ${TEAM_COLORS[game.team1]} 50%, 
          ${TEAM_COLORS[game.team2]} 50%, 
          ${TEAM_COLORS[game.team2]} 100%)`,
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
          <a
            target="_blank"
            href={TEAM_LINKS[game.team1]}
            rel="noopener noreferrer"
          >
            <Image
              src={`/img/${game.team1}.svg`}
              alt={game.team1}
              width={80}
              height={80}
            />
          </a>
          <span style={{ width: 100 }}>
            {game.score1} - {game.score2}
          </span>
          <a
            target="_blank"
            href={TEAM_LINKS[game.team2]}
            rel="noopener noreferrer"
          >
            <Image
              src={`/img/${game.team2}.svg`}
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

export default GameBox;
