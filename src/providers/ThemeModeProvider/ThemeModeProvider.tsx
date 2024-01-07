import React, { useState } from 'react'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import ThemeModeContext from './ThemeModeContext'
import { lightTheme, darkTheme } from 'src/styling/theme'

const ThemeModeProvider = ({ children }: { children: JSX.Element }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark')
  const theme = createTheme(mode === 'light' ? lightTheme : darkTheme)
  return (
    <ThemeProvider theme={theme}>
      <ThemeModeContext.Provider
        value={{
          mode: mode,
          setMode: setMode
        }}
      >
        {children}
      </ThemeModeContext.Provider>
    </ThemeProvider>
  )
}

export default ThemeModeProvider
