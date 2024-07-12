import Head from "next/head";
import React, { useEffect } from "react";
import "bulma/css/bulma.min.css";

export default function Home() {
  const [htmlContents, setHtmlContents] = React.useState([]);

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
    fetch("/api/scraper", {
      method: "get",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then(({ data }) => {
        setHtmlContents(data || []);
        console.log("data", data);
      });
  }, []);

  console.log("htmlContents", htmlContents);
  return (
    <div data-theme="light">
      <Head>
        <title>Fetch Twitter Follower</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div
          className=" is-size-1 has-text-centered"
          style={{ fontFamily: "'Titillium Web',Sans-Serif" }}
        >
          NPB Games
        </div>

        <div
          className="is-size-4 has-text-centered"
          style={{ fontFamily: "'Titillium Web',Sans-Serif" }}
        >
          {`${new Date().toLocaleString("en-US", {
            month: "long",
          })} ${new Date().toLocaleString("en-US", {
            day: "2-digit",
          })} (${new Date().toLocaleDateString("en", { weekday: "short" })})`}
        </div>

        <div
          style={{ height: "100vh" }}
          className="columns is-multiline is-centered"
        >
          {htmlContents.map((html, index) => (
            <div
              key={index}
              className="column  is-flex is-align-items-center has-text-centered is-12-mobile is-6-tablet is-4-desktop is-3-widescreen"
            >
              <div className="column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen">
                <div
                  className="box is-flex is-flex-direction-column is-align-items-center"
                  style={{ height: "100%" }}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
