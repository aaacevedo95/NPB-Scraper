import * as cheerio from "cheerio";
import Cors from "cors";
import "dayjs/locale/ja";

import { initMiddleware } from "./apiHelpers";
import { SHORT_HAND_TEAM_NAMES } from "@/utils/const";

// Initialize CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "HEAD", "POST"],
  })
);

export default async function getTodaysGames(req, res) {
  await cors(req, res);

  if (req.method === "GET") {
    try {
      const response = await fetch("https://npb.jp/games/2024/");
      const htmlString = await response.text();

      const $ = cheerio.load(htmlString);

      const scoreTables = $("#score_live_basic").find(
        `div[class*="three_column"]`
      );

      const games = [];

      scoreTables.each((_, elem) => {
        const gameLink = $(elem).find("a.link_block").attr("href") || "";
        const team1 =
          $(elem).find("td.team1 > a > img").first().attr("title") || "";
        const team2 =
          $(elem).find("td.team2 > a > img").first().attr("title") || "";
        const state = $(elem).find("td.state").first().text() || "";

        // getting scores
        const scores =
          $(elem)
            .find("td.score")
            .map((_, score) => $(score).text())
            .get() || "";

        if (team1 && team2 && scores && state)
          games.push({
            gameLink,
            team1: SHORT_HAND_TEAM_NAMES[team1],
            team2: SHORT_HAND_TEAM_NAMES[team2],
            score1: scores[0],
            score2: scores[1],
            state: state.replace(/\s+/g, " ").trim(),
          });
      });

      res.statusCode = 200;
      return res.json({
        games,
      });
    } catch (e) {
      console.error("Error fetching and processing HTML:", e);
      res.statusCode = 500;
      return res.json({
        error: "Failed to fetch and process content",
      });
    }
  }
}
