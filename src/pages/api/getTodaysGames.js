import * as cheerio from "cheerio";
import Cors from "cors";
import dayjs from "dayjs";
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

// export default async function getTodaysGames(req, res) {
//   await cors(req, res);

//   if (req.method === "GET") {
//     try {
//       const response = await fetch("https://npb.jp/games/2024/");
//       const htmlString = await response.text();

//       const $ = cheerio.load(htmlString);

//       const elements = $(".score_table");
//       const anchors = $("a.link_block");

//       const result = [];
//       const teams = [];

//       elements.each((idx, elem) => {
//         if (idx > 5) return;

//         // Get the corresponding anchor element
//         const anchor = anchors.eq(idx);
//         // Get the href attribute of the anchor
//         const href = anchor.attr("href");

//         // Add inline styles to specific elements
//         $(elem)
//           .find("td")
//           .each((_, td) => {
//             const tdClass = $(td).attr("class");

//             if (!tdClass?.includes("team1") && !tdClass?.includes("team2"))
//               $(td).attr(
//                 "style",
//                 `color:#2e333d;
//                text-shadow: 2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,
//                1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;
//                padding: 12px;  text-align:center; font-size: ${
//                  !tdClass?.includes("state") ? 32 : 16
//                }px;
//                font-weight: bold; font-family: 'Titillium Web',Sans-Serif;`
//               );

//             $(td)
//               .find("img")
//               .each((_, img) => {
//                 const src = $(img).attr("src");
//                 const title = $(img).attr("title");
//                 const srcTitle = src.split("/img/common/")[1].split(".")[0];
//                 const newSrc = `/img/common/${srcTitle}.svg`;

//                 teams.push(TEAM_COLORS[title]);

//                 $(img).attr("src", newSrc);
//               });
//           });

//         // Clear inline styles for <tr> elements
//         $(elem).find("tr").removeAttr("style");

//         result.push(
//           `<a href="https://npb.jp/${href}" target="_blank" style="text-decoration: none">${$.html(
//             elem
//           )}
//             </div>`
//         );
//       });

//       const date = dayjs();
//       const formattedDate = date.locale("ja").format("MM月DD日 (ddd)");

//       res.statusCode = 200;
//       return res.json({
//         result,
//         formattedDate,
//         teams,
//       });
//     } catch (e) {
//       console.error("Error fetching and processing HTML:", e);
//       res.statusCode = 500;
//       return res.json({
//         error: "Failed to fetch and process content",
//       });
//     }
//   }
// }
