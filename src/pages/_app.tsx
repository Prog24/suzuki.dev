import React, { useEffect } from "react"
import Head from "next/head"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import CssBaseline from "@mui/material/CssBaseline"
import { CacheProvider, EmotionCache } from "@emotion/react"
import createEmotionCache from "src/styling/createEmotionCache"
import { ThemeModeProvider } from "src/providers/ThemeModeProvider"
import * as gtag from "../lib/gtag"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>szk</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ThemeModeProvider>
        <Component {...pageProps} />
      </ThemeModeProvider>
    </CacheProvider>
  )
}
