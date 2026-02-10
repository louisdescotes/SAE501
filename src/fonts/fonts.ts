import localFont from "next/font/local";

export const apocNormal = localFont({
  src: [
    {
      path: "./Apoc/ApocNormal-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-apocNormal",
});

export const museoSans = localFont({
  src: [
    { path: "./Museo/MuseoSansCyrl100.ttf", weight: "100" },
    { path: "./Museo/MuseoSansCyrl100Italic.ttf", weight: "100", style: "italic" },
    { path: "./Museo/MuseoSansCyrl300.ttf", weight: "300" },
    { path: "./Museo/MuseoSansCyrl300Italic.ttf", weight: "300", style: "italic" },
    { path: "./Museo/MuseoSansCyrl500.ttf", weight: "500" },
    { path: "./Museo/MuseoSansCyrl500Italic.ttf", weight: "500", style: "italic" },
    { path: "./Museo/MuseoSansCyrl700.ttf", weight: "700" },
    { path: "./Museo/MuseoSansCyrl700Italic.ttf", weight: "700", style: "italic" },
    { path: "./Museo/MuseoSansCyrl900Italic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-museoSans",
});
