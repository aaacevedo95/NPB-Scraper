import { NextApiRequest, NextApiResponse } from "next";

function buildUrl(endpoint: string, month?: string, day?: string): string {
  if (endpoint === "getTodaysGames") {
    return `/api/${endpoint}`;
  }
  const params = new URLSearchParams();
  if (month) params.append("forMonth", month);
  if (day) params.append("forDay", day);
  return `/api/${endpoint}?${params.toString()}`;
}

// Function to fetch data from the given endpoint
export async function getData(endpoint: string, month?: string, day?: string) {
  const url = buildUrl(endpoint, month, day);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// Initialize CORS middleware
export const initMiddleware = (
  middleware: (
    req: NextApiRequest,
    res: NextApiResponse,
    callback: (result?: any) => void
  ) => void
) => {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise<void>((resolve, reject) => {
      middleware(req, res, (result?: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};
