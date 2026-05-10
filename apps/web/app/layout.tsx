import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getSeoConfig, getSiteConfig, getThemeConfig } from "@cenaei/config";
import { Providers } from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

let metadataBase: URL | undefined;
try {
  metadataBase = new URL(`https://${getSiteConfig().domain}`);
} catch {
  metadataBase = undefined;
}

const seo = (() => {
  try {
    return getSeoConfig();
  } catch {
    return { defaultTitle: "Cenaei", defaultDescription: "" };
  }
})();

export const metadata: Metadata = {
  metadataBase,
  title: seo.defaultTitle,
  description: seo.defaultDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let themeCss = "";
  try {
    const theme = getThemeConfig();
    themeCss = `:root{--primary:${theme.colors.primary};--muted:${theme.colors.muted};}`;
  } catch {
    themeCss = "";
  }

  return (
    /*
      ___________________________________________________________
      /                                                           \
    |    ____  U _____ u  _   _      _      _____   ___           |
    |   / ___| \| ___"|/ | \ |"|    / \    | ____| |_ _|          |
    |  | |      |  _|"  <|  \| |>  / _ \   |  _|    | |           |
    |  | |___   | |___  U| |\  |u / ___ \  | |___   | |           |
    |   \____|  |_____|  |_| \_| /_/   \_\ |_____| |___|          |
    |    //_     <<   >> ||   \\,-.     \\  <<   >>  _//          |
    |   (__)    (__) (__)(_")  (_/(__)   (__)(__) (__)(__)        |
    |                                                             |
    |                Portfolio made by: Cenaei                    |
    |                    (Sina Sangiji)                           |
      \___________________________________________________________/
    */
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {themeCss ? (
          <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        ) : null}
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
