"use client"

import { useState, createContext } from "react"

export const RouteContext = createContext<{
  current: string;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
}>({
  current: "",
  setCurrent: () => {}
});

export default function NavContextComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [current, setCurrent] = useState<string>("");

  return (
      <RouteContext value={{current, setCurrent}}>
          {children}
      </RouteContext>
  );
}
