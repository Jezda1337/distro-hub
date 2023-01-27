import Search from "./Form/Search";
import Select from "./Form/Select";

const catergory = [
  {
    id: 1,
    name: "gaming",
    image: "/images/arch.svg",
  },
  {
    id: 2,
    name: "programming",
    image: "/images/arch.svg",
  },
  {
    id: 3,
    name: "general",
    image: "/images/arch.svg",
  },
];

const basedOn = [
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
  return (
    <section className="my-20">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex justify-between flex-col md:flex-row"
      >
        <div className="flex gap-6 flex-col md:flex-row">
          <Select options={basedOn} placeholder="Based on Ubuntu .." />
          <Select options={catergory} placeholder="Category .." />
        </div>
        <Search />
      </form>
    </section>
  );
}
