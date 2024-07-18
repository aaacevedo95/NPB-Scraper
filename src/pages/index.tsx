import "bulma/css/bulma.min.css";

import React from "react";
import HeadComponent from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";

import FetchGames from "@/components/games/FetchGames";

export default function Home() {
  return (
    <div>
      <HeadComponent />
      <Navbar />

      <FetchGames />
    </div>
  );
}
