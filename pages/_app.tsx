import React, { createContext, useState, SetStateAction, Dispatch } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/styling/createEmotionCache";
import { lightTheme, darkTheme } from '../src/styling/theme'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

type ThemeModeContextType = {
  mode: string,
  setMode: Dispatch<SetStateAction<'dark' | 'light'>>
}
export const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: 'dark',
  setMode: () => {}
})

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [mode, setMode] = useState<'light' | 'dark'>('dark')
  const theme = createTheme(mode === 'light' ? lightTheme : darkTheme)
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Suzuki@Prog24</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ThemeModeContext.Provider value={{ mode: mode, setMode: setMode }}>
          <Component {...pageProps} />
        </ThemeModeContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
