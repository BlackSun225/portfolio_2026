"use client"

import { useState, createContext } from "react"
import { LangPrefix } from "../utils/models";

export const RouteContext = createContext<{
  current: string;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
}>({
  current: "",
  setCurrent: () => {}
});

export const LangContext = createContext<{
  lang: LangPrefix,
  setLang: React.Dispatch<React.SetStateAction<LangPrefix>>
}>({
  lang: LangPrefix.en,
  setLang: () => {}
});

export default function NavContextComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const [current, setCurrent] = useState<string>("");
  const [lang, setLang] = useState<LangPrefix>(LangPrefix.en);

  return (
      <RouteContext value={{current, setCurrent}}>
        <LangContext value={{lang, setLang}}>
          {children}
        </LangContext>  
      </RouteContext>
  );
}
