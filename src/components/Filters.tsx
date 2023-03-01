import de_list from "../static/de_list.json";
import Search from "./Form/Search";
import Select from "./Form/Select";
import basedOnList from "../static/based_on.json";
import { useStore } from "@/context/store";

export default function Filters() {
  const { basedOn, setBasedOn, env, setEnv, search, setSearch } = useStore();
  return (
    <section className="my-20">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col justify-between md:flex-row"
      >
        <div className="flex flex-col gap-6 md:flex-row">
          <Select
            options={basedOnList}
            placeholder="Based on Ubuntu .."
            ctxState={basedOn}
            ctxSetState={setBasedOn}
          />
          <Select
            ctxState={env}
            ctxSetState={setEnv}
            options={de_list}
            placeholder="Desktop env .."
          />
        </div>
        <Search ctxState={search} ctxSetState={setSearch} />
      </form>
    </section>
  );
}
