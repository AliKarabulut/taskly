'use client'

import { useState, createContext, Dispatch, SetStateAction } from 'react'

type ThemeProviderProps = {
  theme: string
  children: React.ReactNode
}

export const ThemeContext = createContext({
  theme: 'light',
  setTheme: (() => {}) as Dispatch<SetStateAction<string>>,
})

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [theme, setTheme] = useState(props.theme)
  return <ThemeContext.Provider value={{ theme, setTheme }}>{props.children}</ThemeContext.Provider>
}
