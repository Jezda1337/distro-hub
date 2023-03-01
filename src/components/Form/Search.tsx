import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { FormEvent } from "react";
import { Input } from "../ui/Input";
// import { useState } from "react";

export default function Search({ ctxState, ctxSetState }: any) {
  // const [search, setSearch] = useState("");

  function handleSearch(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    // setSearch(e.currentTarget.value);
    ctxSetState(e.currentTarget.value);
  }

  return (
    <div className="relative mt-8 h-9 w-full md:mt-0 md:w-[255px]">
      <Input
        onChange={handleSearch}
        placeholder="Search by name .."
        autoComplete="off"
        className="pr-8 font-black"
        value={ctxState}
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
