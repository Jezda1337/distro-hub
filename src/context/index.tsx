import React, { createContext, useEffect, useState } from "react";
import data from "../data.json";
export const MyContext = createContext<any | null>(null);

export function Wrapper({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState(data);
  const [search, setSearch] = useState<any>("");

  function setBySearch(query: {
    id: number;
    name: string;
    category: string[];
    popularity: string;
  }) {
    if (!query) return;

    const listByQuery = data.filter(
      ({ name }) => name.toLowerCase() === query?.name?.toLowerCase()
    );
    console.log(list);
    setList(listByQuery);
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
