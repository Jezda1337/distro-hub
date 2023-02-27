import de_list from "../static/de_list.json";
import Search from "./Form/Search";
import Select from "./Form/Select";
import basedOn from "../static/based_on.json";

export default function Filters() {
  return (
    <section className="my-20">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col justify-between md:flex-row"
      >
        <div className="flex flex-col gap-6 md:flex-row">
          <Select options={basedOn} placeholder="Based on Ubuntu .." />
          <Select options={de_list} placeholder="Desktop env .." />
        </div>
        <Search />
      </form>
    </section>
  );
}
