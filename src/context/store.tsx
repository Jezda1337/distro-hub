import { BasedOn } from "@/interfaces/basedOn.interface";
import { DesktopEnvironment } from "@/interfaces/desktopEnvironment.interface";
import { createContext, ReactNode, useContext, useState } from "react";

// context type is needed
const CtxStore = createContext<null | any>(null);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [basedOn, setBasedOn] = useState<BasedOn>();
  const [env, setEnv] = useState<DesktopEnvironment>();
  const [search, setSearch] = useState<String>("");

  return (
    <CtxStore.Provider
      value={{ basedOn, setBasedOn, env, setEnv, search, setSearch }}
    >
      {children}
    </CtxStore.Provider>
  );
}

export const useStore = () => useContext(CtxStore);
