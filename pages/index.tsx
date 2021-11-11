import { useContext } from 'react'
import type { NextPage } from 'next'
import { styled, ThemeProvider } from '@mui/material/styles'
import { lightTheme, darkTheme } from '../src/styling/theme'
import { createTheme } from '@mui/material'
import { ThemeModeContext } from './_app'
import Profile from '../src/components/Profile'
import Posts from '../src/components/Posts'

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}))

const Home: NextPage = () => {
  const { mode } = useContext(ThemeModeContext)
  const theme = createTheme(mode === 'light' ? lightTheme : darkTheme)

  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Profile />
        <Posts />
      </Root>
    </ThemeProvider>
  )
}

export default Home
