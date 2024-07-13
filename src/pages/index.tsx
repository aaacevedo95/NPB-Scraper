import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";

import { usePullToRefresh } from "use-pull-to-refresh";

const URL_START = "https://sports.tv.rakuten.co.jp/pacificleague/schedule/";

const MAXIMUM_PULL_LENGTH = 600;
const REFRESH_THRESHOLD = 180;

export default function Home() {
  const [htmlContents, setHtmlContents] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");
  const [rawData, setRawData] = useState("");
  const [isLoading, setisLoading] = useState(true);

  const [fetchNewData, setFetchNewData] = useState(true);
  const { isRefreshing, pullPosition } = usePullToRefresh({
    onRefresh: () => {
      handleRefetch();
    },
    maximumPullLength: MAXIMUM_PULL_LENGTH,
    refreshThreshold: REFRESH_THRESHOLD,
  });

  console.log("isRefreshing", isRefreshing);
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
      const res = await axios.get("/api/scraper");

      if (res.status === 200) {
        const { result = [], formattedDate, rawData } = res.data;
        setHtmlContents(result || []);
        setFormattedDate(formattedDate);
        setRawData(rawData);
      }

      setisLoading(false);
      setFetchNewData(false);
    };

    console.log("in the use eff");
    if (fetchNewData) fetchData();
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
          <p
            className="is-dark"
            style={{ display: "flex", alignItems: "center" }}
          >
            {formattedDate}
          </p>
        </div>
        <div className="navbar-item">
          <a
            className="button is-primary is-dark  "
            href={`${URL_START}/${rawData}/#today`}
            style={{ textDecoration: "none" }}
          >
            Pacific League Streams
          </a>
        </div>
      </nav>
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
      {!isLoading && (
        <main className="m-5">
          <div className="container">
            <div className="columns is-multiline is-centered">
              {htmlContents.map((html, index) => (
                <div
                  key={index}
                  className="column is-12-mobile is-6-tablet is-4-desktop  "
                >
                  <div
                    className="box is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
                    style={{ height: "100%" }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
