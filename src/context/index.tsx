import React, { createContext, useEffect, useState } from "react";
import data from "../data.json";
export const MyContext = createContext<any | null>(null);

export function Wrapper({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState(data);
  const [search, setSearch] = useState<any>("");
  const [popUp, setPopUp] = useState(false);
  const [selectByBasedOn, setSelectByBasedOn] = useState<any>("");
  const [selectByEnv, setSelectByEnv] = useState<any>("");

  useEffect(() => {
    setBySelect();
  }, [selectByEnv, selectByBasedOn]);

  function setBySelect() {
    const selectedValues = {
      basedOn: "",
      desktopEnv: "",
    };

    if (selectByEnv !== "" && selectByBasedOn === "") {
      selectedValues.desktopEnv = selectByEnv.name.toLowerCase();
      setList(() =>
        data.filter(({ desktopEnvironments }) =>
          desktopEnvironments.includes(selectedValues.desktopEnv)
        )
      );
      return;
    }
    if (selectByBasedOn !== "" && selectByEnv === "") {
      selectedValues.basedOn = selectByBasedOn.name.toLowerCase();
      setList(() =>
        data.filter(({ basedOn }) => basedOn.includes(selectedValues.basedOn))
      );

      return;
    }
    if (selectByEnv !== "" && selectByBasedOn !== "") {
      const test = data.filter(
        ({ desktopEnvironments, basedOn }) =>
          basedOn.includes(selectByBasedOn.name.toLowerCase()) &&
          desktopEnvironments.includes(selectByEnv.name.toLowerCase())
      );

      setList(test);
      return;
    } else {
      setList(data);
    }
  }

  function setBySearch(query: string) {
    if (query.length >= 3) {
      const listByQuery = data.filter(({ name }) =>
        name.toLowerCase().match(query.toLowerCase())
      );

      setList(listByQuery);
    } else setList(data);
  }

  useEffect(() => {
    setBySearch(search);
  }, [search]);

  return (
    <MyContext.Provider
      value={{
        list,
        search,
        setSearch,
        popUp,
        setPopUp,
        setSelectByBasedOn,
        setSelectByEnv,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default Wrapper;
