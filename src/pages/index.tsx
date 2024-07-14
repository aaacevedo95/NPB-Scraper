import "bulma/css/bulma.min.css";
import styles from "./page.module.css";

import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";

import dayjs from "dayjs";

import PuffLoader from "react-spinners/PuffLoader";
import { usePullToRefresh } from "use-pull-to-refresh";

import { getData } from "./api/apiHelpers";
import {
  MAXIMUM_PULL_LENGTH,
  REFRESH_THRESHOLD,
  STREAM_URL,
  TEAM_COLORS,
  TEAM_LINKS,
} from "../const";

export function isToday({ day, month }: { day: string; month: string }) {
  const dayNumber = parseInt(day, 10); // Convert day to a number
  const monthNumber = parseInt(month, 10); // Convert month to a number

  const today = dayjs();
  const givenDate = dayjs()
    .set("date", dayNumber)
    .set("month", monthNumber - 1); // Month is 0-indexed

  return today.isSame(givenDate, "day");
}

type GameType = {
  score1: string;
  score2: string;
  team1: string;
  team2: string;
  gameLink: string;
  state?: string;
  place?: string;
  time?: string;
};

export default function Home() {
  const [isLoading, setisLoading] = useState(true);
  const [fetchNewData, setFetchNewData] = useState(true);
  const [dates, setDates] = useState({
    month: dayjs().format("MM"),
    day: dayjs().format("DD"),
  });

  const [gamesList, setGamesList] = useState<GameType[]>([]);

  const { pullPosition } = usePullToRefresh({
    onRefresh: () => {
      handleRefetch();
    },
    maximumPullLength: MAXIMUM_PULL_LENGTH,
    refreshThreshold: REFRESH_THRESHOLD,
  });

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((_) => console.log("Service Worker registered"))
        .catch((err) =>
          console.error("Service Worker registration failed", err)
        );
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      let data;

      if (isToday(dates)) data = await getData("getTodaysGames");
      else data = await getData("getPreviousGames", dates.month, dates.day);

      if (data) {
        const { games } = data;
        setGamesList(games);
      }
      setisLoading(false);
      setFetchNewData(false);
    };

    if (fetchNewData) {
      fetchData();
    }
  }, [fetchNewData]);

  const handleRefetch = () => {
    setisLoading(true);
    setFetchNewData(true);
  };
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const dateVal = value.split("-");

    setDates({
      month: dayjs(dateVal[1]).format("MM"),
      day: dateVal[2],
    });
    handleRefetch();
  };

  console.log("gamesList", gamesList);
  const formattedDate = dayjs()
    .set("year", 2024)
    .set("month", parseInt(dates.month, 10) - 1)
    .set("date", parseInt(dates.day, 10))
    .format("YYYY-MM-DD");

  return (
    <div data-theme="light">
      <Head>
        <title>NPBandy</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      {/* Header */}
      <nav
        className={`navbar is-fixed-top is-dark has-text-centered`}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 8,
          paddingLeft: 8,
        }}
      >
        <div className="navbar-brand" style={{ padding: 6 }}>
          <Image src="/logo.png" width={50} height={40} alt="NPB Games" />
        </div>
        <div className="navbar-item">
          <a
            className="button is-primary is-dark  "
            href={STREAM_URL}
            style={{ textDecoration: "none" }}
          >
            Pacific League Streams
          </a>
        </div>
      </nav>

      {/* Pull to load */}
      <div
        className="has-text-centered  is-size-7 "
        style={{ paddingTop: 70 }}
        onClick={handleRefetch}
      >
        {pullPosition > REFRESH_THRESHOLD
          ? "Release to refresh"
          : "Pull / Press to refresh scores"}
      </div>

      {/* Main Content */}
      <main className="m-4">
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PuffLoader
              color="#006b5b"
              loading={isLoading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div className="container">
            <div style={{ padding: 20 }}>
              <input
                className="input has-background-dark is-primary"
                type="date"
                placeholder="Dark mode input"
                id="dateInput"
                value={formattedDate}
                onChange={handleDateChange}
              />
            </div>
            <div className="columns is-multiline is-centered">
              {gamesList.length === 0 ? (
                <p className="has-text-centered is-size-4">No Games</p>
              ) : (
                gamesList.map((game, idx) => (
                  <a
                    key={idx}
                    target="_blank"
                    href={`https://npb.jp/${game.gameLink}`}
                    rel="noopener noreferrer"
                  >
                    <div className="column is-12-mobile ">
                      <div
                        className={`box is-flex is-flex-direction-column is-align-items-center is-justify-content-center ${styles["game-box-font"]}`}
                        style={{
                          height: "100%",
                          background: `linear-gradient(
                        110deg,
                        ${TEAM_COLORS[game.team1]} 0%,
                        ${TEAM_COLORS[game.team1]} 50%,
                        ${TEAM_COLORS[game.team2]} 50%,
                        ${TEAM_COLORS[game.team2]} 100%
                      )`,
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

                          <span>
                            {game.score1} - {game.score2}
                          </span>

                          <a
                            target="_blank"
                            href={TEAM_LINKS[game.team1]}
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

                        <div></div>
                        <div style={{ fontSize: 14 }}>{game.state}</div>
                      </div>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
