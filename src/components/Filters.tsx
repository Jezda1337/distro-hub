import { MyContext } from "@/context";
import { useContext } from "react";
import de_list from "../de_list.json";
import Search from "./Form/Search";
import Select from "./Form/Select";

const basedOn = [
  {
    id: 0,
    name: "None",
  },
  {
    id: 1,
    name: "Ubuntu",
    image: "/images/ubuntu.svg",
  },
  {
    id: 2,
    name: "Debian",
    image: "/images/debian.svg",
  },
  {
    id: 3,
    name: "Arch",
    image: "/images/arch.svg",
  },
  {
    id: 4,
    name: "Fedora",
    image: "/images/fedora.svg",
  },
  {
    id: 5,
    name: "Debian Stable",
    image: "/images/debian.svg",
  },
  {
    id: 6,
    name: "Debian Nightly",
    image: "/images/debian.svg",
  },
];

export default function Filters() {
  const { setSelectByBasedOn, setSelectByEnv } = useContext(MyContext);
  return (
    <section className="my-20">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex justify-between flex-col md:flex-row"
      >
        <div className="flex gap-6 flex-col md:flex-row">
          <Select
            options={basedOn}
            placeholder="Based on Ubuntu .."
            setSelect={setSelectByBasedOn}
          />
          <Select
            options={de_list}
            placeholder="Desktop env .."
            setSelect={setSelectByEnv}
          />
        </div>
        <Search />
      </form>
    </section>
  );
}
