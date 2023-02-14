import Header from "@/components/Header";
import Wrapper from "@/context";
import { Poppins } from "@next/font/google";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <div className={`max-w-4xl mx-auto px-3 ${poppins.className}`}>
        <Header />
        <Component {...pageProps} />
      </div>
    </Wrapper>
  );
}
