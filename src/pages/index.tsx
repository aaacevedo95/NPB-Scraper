import "bulma/css/bulma.min.css";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";

import PuffLoader from "react-spinners/PuffLoader";
import { usePullToRefresh } from "use-pull-to-refresh";

import { getData } from "./api/apiHelpers";
import { MAXIMUM_PULL_LENGTH, REFRESH_THRESHOLD, STREAM_URL } from "./const";

export default function Home() {
  const [htmlContents, setHtmlContents] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [fetchNewData, setFetchNewData] = useState(true);
  const [teamColors, setTeamColors] = useState([]);

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
    const setData = async () => {
      const data = await getData();

      if (data) {
        const { result = [], formattedDate, teams } = data;
        setHtmlContents(result || []);
        setFormattedDate(formattedDate);
        setTeamColors(teams);
      }

      setisLoading(false);
      setFetchNewData(false);
    };

    if (fetchNewData) setData();
  }, [fetchNewData]);

  const handleRefetch = () => {
    setisLoading(true);
    setFetchNewData(true);
  };

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
      <main className="m-5">
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
            <p className="is-dark has-text-right" style={{ padding: 8 }}>
              {formattedDate}
            </p>

            <div className="columns is-multiline is-centered">
              {htmlContents.map((html, index) => {
                const colorIndex1 = index * 2;
                const colorIndex2 = index * 2 + 1;

                return (
                  <div
                    key={index}
                    className="column is-12-mobile is-6-tablet is-4-desktop  "
                  >
                    <div
                      className="box is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
                      style={{
                        height: "100%",
                        background: `linear-gradient(
                        110deg, 
                        ${teamColors[colorIndex1]} 0%, 
                        ${teamColors[colorIndex1]} 50%, 
                        ${teamColors[colorIndex2]}  50%, 
                        ${teamColors[colorIndex2]}  100%
                      )`,
                      }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: html }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
