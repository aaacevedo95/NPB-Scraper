export const TEAMS: {
  [key: string]: {
    color: string;
    link: string;
    shorthand: string;
    svgUrl: string;
  };
} = {
  巨人: {
    color: "#F49C00",
    link: "https://www.giants.jp/",
    shorthand: "読売ジャイアンツ",
    svgUrl: "/img/巨人.svg",
  },
  DeNA: {
    color: "#004583",
    link: "https://www.baystars.co.jp/",
    shorthand: "横浜DeNAベイスターズ",
    svgUrl: "/img/DeNA.svg",
  },
  中日: {
    color: "#003377",
    link: "http://dragons.jp/",
    shorthand: "中日ドラゴンズ",
    svgUrl: "/img/中日.svg",
  },
  阪神: {
    color: "#060606",
    link: "https://hanshintigers.jp/",
    shorthand: "阪神タイガース",
    svgUrl: "/img/阪神.svg",
  },
  広島: {
    color: "#E70012",
    link: "https://www.carp.co.jp/",
    shorthand: "広島東洋カープ",
    svgUrl: "/img/広島.svg",
  },
  ヤクルト: {
    color: "#00A051",
    link: "https://www.yakult-swallows.co.jp/",
    shorthand: "東京ヤクルトスワローズ",
    svgUrl: "/img/ヤクルト.svg",
  },
  日本ハム: {
    color: "#016299",
    link: "https://www.fighters.co.jp/",
    shorthand: "北海道日本ハムファイターズ",
    svgUrl: "/img/日本ハム.svg",
  },
  ソフトバンク: {
    color: "#F5C700",
    link: "https://www.softbankhawks.co.jp/",
    shorthand: "福岡ソフトバンクホークス",
    svgUrl: "/img/ソフトバンク.svg",
  },
  楽天: {
    color: "#943E10",
    link: "https://www.rakuteneagles.jp/",
    shorthand: "東北楽天ゴールデンイーグルス",
    svgUrl: "/img/楽天.svg",
  },
  西武: {
    color: "#AB0008",
    link: "https://www.seibulions.jp/",
    shorthand: "埼玉西武ライオンズ",
    svgUrl: "/img/西武.svg",
  },
  ロッテ: {
    color: "#E5E1E6",
    link: "https://www.marines.co.jp/",
    shorthand: "千葉ロッテマリーンズ",
    svgUrl: "/img/ロッテ.svg",
  },
  オリックス: {
    color: "#000019",
    link: "https://www.buffaloes.co.jp/",
    shorthand: "オリックス・バファローズ",
    svgUrl: "/img/オリックス.svg",
  },
  "パ・リーグ": {
    color: "#42b5e6",
    link: "",
    shorthand: "パシフィック・リーグ",
    svgUrl: "/img/パ・リーグ.png",
  },
  "セ・リーグ": {
    color: "#15a937",
    link: "",
    shorthand: "セントラル・リーグ",
    svgUrl: "/img/セ・リーグ.svg",
  },
};

export const SHORT_HAND_TEAM_NAMES = {
  読売ジャイアンツ: "巨人",
  横浜DeNAベイスターズ: "DeNA", // Yokohama DeNA BayStars
  中日ドラゴンズ: "中日", // Chunichi Dragons
  阪神タイガース: "阪神", // Hanshin Tigers
  広島東洋カープ: "広島", // Hiroshima Toyo Carp
  東京ヤクルトスワローズ: "ヤクルト", // Tokyo Yakult Swallows
  北海道日本ハムファイターズ: "日本ハム", // Hokkaido Nippon-Ham Fighters
  福岡ソフトバンクホークス: "ソフトバンク", // Fukuoka SoftBank Hawks
  東北楽天ゴールデンイーグルス: "楽天", // Tohoku Rakuten Golden Eagles
  埼玉西武ライオンズ: "西武", // Saitama Seibu Lions
  千葉ロッテマリーンズ: "ロッテ", // Chiba Lotte Marines
  "オリックス・バファローズ": "オリックス", // Orix Buffaloes
  "パシフィック・リーグ": "パ・リーグ", // Pacific League
  "セントラル・リーグ": "セ・リーグ", // Central League
};

export const SVG_URLS = [
  "/img/巨人.svg",
  "/img/DeNA.svg",
  "/img/中日.svg",
  "/img/阪神.svg",
  "/img/広島.svg",
  "/img/ヤクルト.svg",
  "/img/日本ハム.svg",
  "/img/ソフトバンク.svg",
  "/img/楽天.svg",
  "/img/西武.svg",
  "/img/ロッテ.svg",
  "/img/オリックス.svg",
  "/img/セ・リーグ.svg",
];

export const STREAM_URL = "https://sports.tv.rakuten.co.jp/pacificleague/";

export const MAXIMUM_PULL_LENGTH = 600;
export const REFRESH_THRESHOLD = 180;
