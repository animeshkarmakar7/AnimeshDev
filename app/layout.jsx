import "./globals.css";
import SmoothScrollProvider from "../components/SmoothScrollProvider";

export const metadata = {
  title: "Animesh Karmakar — AI Engineer",
  description: "Portfolio of Animesh Karmakar, AI & Data Science graduate building production-ready ML, RAG and agentic systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}