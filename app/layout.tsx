// app/layout.tsx
import "./globals.css";
import "@fontsource/ibm-plex-mono";

export const metadata = {
  title: "BBLOG WORLD WIDE",
  description: "Portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}