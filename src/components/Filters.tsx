import Search from "./Form/Search";
import Select from "./Form/Select";

export default function Filters() {
  const options: any[] = [
    {
      id: 1,
      value: "Ubuntu",
    },
    {
      id: 2,
      value: "Arch",
    },
  ];

  const categoryOptions: any[] = [
    {
      id: 1,
      value: "Gaming",
    },
    {
      id: 2,
      value: "Programming",
    },
  ];
  return (
    <section className="my-20">
      <form className="flex justify-between">
        <div className="flex gap-6">
          <Select options={options} placeholder="Based on Ubuntu .." />
          <Select options={categoryOptions} placeholder="Choose category .." />
        </div>

        <Search />
      </form>
    </section>
  );
}
