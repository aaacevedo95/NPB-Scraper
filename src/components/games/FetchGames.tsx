// components/FetchGames.js
import React, { useEffect, useState, ChangeEvent } from "react";
import dayjs from "dayjs";
import { usePullToRefresh } from "use-pull-to-refresh";

import { getData } from "@/pages/api/apiHelpers";
import { isToday } from "@/utils/helper";
import { MAXIMUM_PULL_LENGTH, REFRESH_THRESHOLD } from "@/utils/const";

import Loader from "../common/Loader";
import DateInput from "../common/DateInput";
import GamesList from "./GameList";

const FetchGames = () => {
  const [isLoading, setisLoading] = useState(true);
  const [fetchNewData, setFetchNewData] = useState(true);
  const [gamesList, setGamesList] = useState([]);
  const [dates, setDates] = useState({
    month: dayjs().format("MM"),
    day: dayjs().format("DD"),
  });

  const formattedDate = dayjs()
    .set("year", 2024)
    .set("month", parseInt(dates.month, 10) - 1)
    .set("date", parseInt(dates.day, 10))
    .format("YYYY-MM-DD");

  const handleRefetch = () => {
    setisLoading(true);
    setFetchNewData(true);
  };
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const dateVal = value.split("-");
    setDates({
      month: dateVal[1],
      day: dateVal[2],
    });
    handleRefetch();
  };

  const { pullPosition } = usePullToRefresh({
    onRefresh: () => {
      handleRefetch();
    },
    maximumPullLength: MAXIMUM_PULL_LENGTH,
    refreshThreshold: REFRESH_THRESHOLD,
  });

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
  }, [fetchNewData, dates]);

  return (
    <div>
      <div
        className="has-text-centered is-size-7"
        style={{ paddingTop: 70 }}
        onClick={handleRefetch}
      >
        {pullPosition > REFRESH_THRESHOLD
          ? "Release to refresh"
          : "Pull / Press to refresh scores"}
      </div>

      <DateInput
        formattedDate={formattedDate}
        handleDateChange={handleDateChange}
      />

      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className="container">
          <GamesList gamesList={gamesList} />
        </div>
      )}
    </div>
  );
};

export default FetchGames;
