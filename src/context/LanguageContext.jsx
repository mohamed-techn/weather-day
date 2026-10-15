import { useContext, useMemo, useState } from "react";
import { createContext } from "react";
import ar from "../locales/ar.json"
import en from "../locales/en.json"

const dictionaries = {ar , en};

const LanguageContext = createContext(null);  

export default function LanguageProvider({children}){
  const [lang , setLang] = useState("en")
  const value = useMemo(()=>{
    const isRTL = lang === "ar";
    return{
      lang,
      isRTL,
      setLang,
      toggleLang: ()=> setLang((prev) => (prev === "ar" ? "en" : "ar")),
      t:dictionaries[lang]
    }
  }, [lang])

  return(
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(){
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}