import "@/styles/global.scss";
import ReactLenis from "lenis/react";
import { apocNormal, museoSans } from "../fonts/fonts";

export const metadata = {
  title: "My Next Template",
  description: "Next.js starter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${apocNormal.variable} ${museoSans.variable}`}>
      <ReactLenis root />
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
