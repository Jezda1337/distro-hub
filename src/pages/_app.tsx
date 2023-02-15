import Header from "@/components/Header";
import { Poppins } from "@next/font/google";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useState } from "react";
import "tailwindcss/tailwind.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <div className={`max-w-4xl mx-auto px-3 ${poppins.className}`}>
          <Header />
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </div>
      </Hydrate>
    </QueryClientProvider>
  );
}
