// app/layout.tsx
import "./globals.css";
import "@fontsource/ibm-plex-mono";
import Layout from "./components/layout"; // importing your component layout

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
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
