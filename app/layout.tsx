import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub - Manage your notes effectively",
  description:
    "A convenient application to manage, organize, and track your personal notes.",
  openGraph: {
    title: "NoteHub - Manage your notes effectively",
    description:
      "A convenient application to manage, organize, and track your personal notes.",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub App",
      },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <div
            className="app-container"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />

            <main style={{ flex: 1 }}>{children}</main>

            <footer
              style={{
                padding: "20px",
                textAlign: "center",
                borderTop: "1px solid #eaeaea",
              }}
            >
              <p>
                &copy; {new Date().getFullYear()} NoteHub. All rights reserved.
              </p>
            </footer>

            {modal}
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}
