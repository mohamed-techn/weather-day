import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeModeContext = createContext(null);

export function ThemeModeProvider ({children}){
  const [mode , setMode ] = useState(()=>{
    const saved = localStorage.getItem("mode");
    if(saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(()=>{
    localStorage.setItem("mode" , mode)
  },[mode]);
  const value = useMemo(()=>({
    mode,
    toggleMode : ()=>setMode((prev)=>(prev === "light" ? "dark" : "light"))
  }), [ mode ])

  return( 
  <ThemeModeContext.Provider value={value}>
    {children}
  </ThemeModeContext.Provider>
  )
}

export function useThemeMode(){
  const ctx = useContext(ThemeModeContext)
  if (!ctx) throw new Error("useThemeMode must be used within ThemeModeProvider");
  return ctx;
}