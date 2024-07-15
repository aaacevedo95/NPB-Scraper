import "bulma/css/bulma.min.css";

import React, { useEffect } from "react";
import HeadComponent from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";

import FetchGames from "@/components/games/FetchGames";

export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Service Worker registered"))
        .catch((err) =>
          console.error("Service Worker registration failed", err)
        );
    }
  }, []);

  return (
    <div data-theme="light">
      <HeadComponent />
      <Navbar />

      <main className="m-4">
        <FetchGames />
      </main>
    </div>
  );
}
