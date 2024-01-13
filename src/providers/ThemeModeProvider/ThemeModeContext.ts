import { createContext, Dispatch, SetStateAction } from "react"

type ThemeModeContextType = {
  mode: string
  setMode: Dispatch<SetStateAction<"dark" | "light">>
}
const ThemeModeContext = createContext({} as ThemeModeContextType)
ThemeModeContext.displayName = "ThemeModeContext"

export default ThemeModeContext
