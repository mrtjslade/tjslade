import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "../index.css";
import "../styles/professional.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tjslade.com"),
  title: "TJ Slade | Portfolio",
  description:
    "Portfolio of TJ Slade, a web developer building modern client sites and products with React, Next.js, TypeScript, and WordPress, plus the APIs, data pipelines, and AI workflows behind them.",
  openGraph: {
    title: "TJ Slade, Developer & Educator",
    description:
      "Modern, fast, scalable web experiences with React, Next.js, TypeScript, and WordPress.",
    type: "website",
    url: "https://tjslade.com",
    images: ["/preview.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
    apple: "/tj-favicon-180.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

// Set the saved theme before first paint so space-mode visitors don't see a
// flash of the professional styles.
const themeScript = `try{var m=localStorage.getItem("tjslade-theme-mode");document.documentElement.dataset.theme=m==="space"?"space":"professional"}catch(e){document.documentElement.dataset.theme="professional"}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="professional"
      className={`${bebas.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
