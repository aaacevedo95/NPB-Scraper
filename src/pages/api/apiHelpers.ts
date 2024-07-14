import { NextApiRequest, NextApiResponse } from "next";

export async function getData() {
  const res = await fetch("/api/scraper");

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
