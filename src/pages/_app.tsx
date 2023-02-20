import { AdminHeader } from "@/components/admin/Header";
import Header from "@/components/Header";
import { Poppins } from "@next/font/google";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useState } from "react";
import "tailwindcss/tailwind.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  if (Component.getLayout) {
    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <div className={`max-w-4xl mx-auto px-3 ${poppins.className}`}>
            <AdminHeader />
            {Component.getLayout(<Component {...pageProps} />)}
            <ReactQueryDevtools />
          </div>
        </Hydrate>
      </QueryClientProvider>
    );
  }

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
