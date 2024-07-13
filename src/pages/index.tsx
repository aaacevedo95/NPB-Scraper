import "bulma/css/bulma.min.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";

const URL_START = "https://sports.tv.rakuten.co.jp/pacificleague/schedule/";

export default function Home() {
  const [htmlContents, setHtmlContents] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");
  const [rawData, setRawData] = useState("");

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
    };

    fetchData();
  }, []);

  return (
    <div data-theme="light">
      <Head>
        <title>NPBandy</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <main className="m-4">
        <div className="container">
          {/* Header */}
          <div className="columns is-centered">
            <div className="column is-12 has-text-centered">
              <Image src="/logo.png" width={100} height={100} alt="NPB Games" />
              <div className="is-size-4 has-text-centered m-2">
                <p style={{ fontFamily: "Titillium Web, sans-serif" }}>
                  {formattedDate}
                </p>
                <a
                  className="button is-primary is-dark"
                  href={`${URL_START}/${rawData}/#today`}
                  style={{ textDecoration: "none" }}
                >
                  Pacific League Streams
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="columns is-multiline is-centered">
            {htmlContents.map((html, index) => (
              <div
                key={index}
                className="column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen"
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
    </div>
  );
}
