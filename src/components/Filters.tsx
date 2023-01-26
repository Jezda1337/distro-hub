import Search from "./Form/Search";
import Select from "./Form/Select";

const catergory = [
  {
    id: 1,
    name: "gaming",
  },
  {
    id: 2,
    name: "programming",
  },
  {
    id: 3,
    name: "general",
  },
];

const basedOn = [
  {
    id: 1,
    name: "Ubuntu",
  },
  {
    id: 2,
    name: "Debian",
  },
  {
    id: 3,
    name: "Arch",
  },
  {
    id: 4,
    name: "Fedora",
  },
  {
    id: 5,
    name: "Debian Stable",
  },
  {
    id: 6,
    name: "Debian Nightly",
  },
];

export default function Filters() {
  return (
    <section className="my-20">
      <form className="flex justify-between">
        <div className="flex gap-6">
          <Select options={basedOn} placeholder="Based on Ubuntu .." />
          <Select options={catergory} placeholder="Choose category .." />
        </div>
        <Search />
      </form>
    </section>
  );
}
