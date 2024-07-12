// pages/api/proxy.js

export default async (req, res) => {
  const { url } = req.query;

  if (!url) {
    res.status(400).json({ error: "Missing URL" });
    return;
  }

  try {
    const response = await fetch(decodeURIComponent(url));
    const contentType = response.headers.get("content-type");

    res.setHeader("Content-Type", contentType);
    response.body.pipe(res);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch image" });
  }
};
