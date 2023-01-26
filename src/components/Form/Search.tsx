import { MyContext } from "@/context";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState, useContext } from "react";

export default function Test() {
  // const [search, setSearch] = useState("");
  const { search, setSearch, list } = useContext(MyContext);

  function handleSearch(e: any) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <div className="h-9 relative w-[255px]">
      <input
        onChange={handleSearch}
        autoComplete="off"
        className="w-full border rounded py-2 pr-7 px-3 h-9 focus:outline-black"
        type="text"
        placeholder="Search by name .."
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
        <MagnifyingGlassIcon
          className="h-5 w-5  text-gray-400"
          aria-hidden="true"
        />
      </div>
      {search}
    </div>
  );
}
