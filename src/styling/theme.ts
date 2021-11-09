import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#009688',
    },
    background: {
      default: '#ECEFF1'
    }
  }
})
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#009688',
    },
    text: {
      primary: '#FFF',
      secondary: 'rgba(256,256,256,0.6)',
    },
    background: {
      paper: '#484954',
      default: '#323336',
    }
  }
})
