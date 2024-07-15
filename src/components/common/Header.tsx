import Head from "next/head";
import { SVG_URLS } from "@/utils/const";

const HeadComponent = () => (
  <Head>
    <title>NPBandy</title>
    <link rel="icon" href="/favicon.ico" />
    <link rel="manifest" href="/manifest.json" />
    {SVG_URLS.map((url) => (
      <link
        key={url}
        rel="preload"
        href={url}
        as="image"
        type="image/svg+xml"
      />
    ))}
  </Head>
);

export default HeadComponent;
