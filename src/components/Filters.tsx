import Search from "./Form/Search";
import Select from "./Form/Select";

interface Data {
  id: number;
  name: string;
  category: string[];
  popularity: string;
}

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

export default function Filters() {
  return (
    <section className="my-20">
      <form className="flex justify-between">
        <div className="flex gap-6">
          <Select options={catergory} placeholder="Based on Ubuntu .." />
          <Select options={catergory} placeholder="Choose category .." />
        </div>

        <Search />
      </form>
    </section>
  );
}
