import Header from "@/components/Header"
import { AdminHeader } from "@/components/admin/Header"
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { NextPage } from "next"
import type { AppProps } from "next/app"
import { Poppins } from "next/font/google"
import { ReactElement, ReactNode, useState } from "react"
import "tailwindcss/tailwind.css"
import { ContextProvider } from "../context/store"
import "./index.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  preload: true,
  fallback: ["system-ui", "arial"],
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient())

  if (Component.getLayout) {
    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ContextProvider>
            <div className={`max-w-4xl mx-auto px-3 ${poppins.className}`}>
              <AdminHeader />
              {Component.getLayout(<Component {...pageProps} />)}
              <ReactQueryDevtools />
            </div>
          </ContextProvider>
        </Hydrate>
      </QueryClientProvider>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ContextProvider>
          <div className={`max-w-4xl mx-auto px-3 ${poppins.className}`}>
            <Header />
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </div>
        </ContextProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
