import * as cheerio from "cheerio";
import Cors from "cors";

import { initMiddleware } from "./apiHelpers";

// Initialize CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "HEAD", "POST"],
  })
);

export default async function getOtherDaysGames(req, res) {
  await cors(req, res);
  if (req.method === "GET") {
    try {
      const { forYear, forMonth, forDay } = req.query;

      const response = await fetch(
        `https://npb.jp/games/${forYear}/schedule_${forMonth}_detail.html`
      );

      const htmlString = await response.text();

      const $ = cheerio.load(htmlString);

      // Find the first <tbody> tag
      const tableBody = $("tbody").first();

      const games = [];

      // Find all <tr> elements within the first <tbody> tag
      const gameRows = tableBody.find(`tr#date${forMonth}${forDay}`);

      gameRows.each((_, gameTr) => {
        const game = $(gameTr);

        const gameLink = game.find("a").attr("href") ?? "";

        const team1 = game.find(".team1").text().trim() || "";
        const team2 = game.find(".team2").text().trim() || "";
        const score1 = game.find(".score1").text().trim() || "";
        const score2 = game.find(".score2").text().trim() || "";
        const place = game.find(".place").text().trim() || "";
        const time = game.find(".time").text().trim() || "";

        // Only push the game object if all required data is present
        if (team1 && team2 && place)
          games.push({
            team1,
            team2,
            score1,
            score2,
            gameLink,
            state: `(${place}) ${time}`,
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
