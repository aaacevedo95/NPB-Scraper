import * as cheerio from "cheerio";
import Cors from "cors";
import dayjs from "dayjs";

// Initialize CORS middleware
export const initMiddleware = (middleware) => {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};

// Example usage for CORS middleware
initMiddleware(
  Cors({
    methods: ["GET", "HEAD", "POST"],
  })
);
// Initialize CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "HEAD", "POST"],
  })
);

export default async function scraper(req, res) {
  await cors(req, res); // Apply CORS middleware to your route

  if (req.method === "GET") {
    try {
      const response = await fetch("https://npb.jp/games/2024/");
      const htmlString = await response.text();

      const $ = cheerio.load(htmlString);

      const elements = $(".score_table");
      const anchors = $("a.link_block");

      const result = [];

      elements.each((idx, elem) => {
        if (idx > 5) return;

        // Get the corresponding anchor element
        const anchor = anchors.eq(idx);
        // Get the href attribute of the anchor
        const href = anchor.attr("href");

        // Adjust the image paths if necessary
        $(elem)
          .find("img")
          .each((_, img) => {
            const src = $(img).attr("src");
            const newSrc = `/img/common/${src.split("/img/common/")[1]}`;
            $(img).attr("src", newSrc);
          });

        // Clear inline styles for <tr> elements
        $(elem).find("tr").removeAttr("style");

        // Add inline styles to specific elements
        $(elem)
          .find("td")
          .each((_, td) => {
            const tdClass = $(td).attr("class");

            // if (!tdClass?.includes("state")) {
            $(td).attr(
              "style",
              `color:black ; padding: 12px;  text-align:center; font-size: ${
                !tdClass?.includes("state") ? 32 : 16
              }px; font-weight: bold; font-family: 'Titillium Web',Sans-Serif;`
            );
            // }
          });

        // result.push($.html(elem));
        result.push(
          `<a href="https://npb.jp/${href}" target="_blank" style="text-decoration: none">${$.html(
            elem
          )}
          </div>`
        );
      });

      const date = dayjs();
      const formattedDate = date.format("YYYY-MM-DD (ddd)");
      const rawDate = date.format("YYYYMM");

      res.statusCode = 200;
      return res.json({
        result,
        formattedDate,
        rawDate,
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
