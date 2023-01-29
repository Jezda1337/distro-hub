import { MyContext } from "@/context";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useContext, FormEvent } from "react";
import { Input } from "../ui/Input";

export default function Test() {
  const { search, setSearch } = useContext(MyContext);

  function handleSearch(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearch(e.currentTarget.value);
  }

  return (
    <div className="w-full md:w-[255px] h-9 relative mt-8 md:mt-0">
      <Input
        onChange={handleSearch}
        placeholder="Search by name .."
        autoComplete="off"
        className="font-black"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
        <MagnifyingGlassIcon
          className="h-5 w-5  text-gray-400"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
