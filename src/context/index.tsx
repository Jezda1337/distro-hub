import React, { createContext, useEffect, useState } from "react";
import data from "../data.json";
export const MyContext = createContext<any | null>(null);

export function Wrapper({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState(data);
  const [search, setSearch] = useState<any>("");

  function setBySearch(query: string) {
    console.log(query.length);
    if (query.length >= 3) {
      const listByQuery = data.filter(({ name }) =>
        name.toLowerCase().includes(query.toLowerCase())
      );

      setList(listByQuery);
    } else setList(data);
  }

  useEffect(() => {
    setBySearch(search);
  }, [search]);

  return (
    <MyContext.Provider value={{ list, search, setSearch }}>
      {children}
    </MyContext.Provider>
  );
}

export default Wrapper;
