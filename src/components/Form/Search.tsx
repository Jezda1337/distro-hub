import { MyContext } from "@/context";
import { Combobox, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Fragment, useContext, useEffect, useState } from "react";
import data from "../../data.json";

interface Selected {
  id: number;
  name: string;
  category: string[];
  popularity: string;
}

export default function Example() {
  // const [selected, setSelected] = useState<Selected | null>(null);
  const [query, setQuery] = useState("");
  const { search, setSearch, list } = useContext(MyContext);

  const filteredPeople =
    query.length >= 3
      ? data.filter((distro: any) =>
          distro.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )
      : [];

  return (
    <div className="top-16 w-72">
      <Combobox value={search} onChange={setSearch}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left sm:text-sm border border-gray-300">
            <Combobox.Input
              autoComplete="off"
              placeholder="Search by name .."
              className="w-full h-9 border-none font-bold py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none"
              displayValue={(distro: { id: number; name: string }) =>
                !query ? "" : distro?.name
              }
              onChange={(event) => setQuery(event.target.value)}
            />

            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <MagnifyingGlassIcon
                className="h-5 w-5  text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((distro) => (
                  <Combobox.Option
                    key={distro.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-4 ${
                        active ? "bg-black text-white" : "text-gray-900"
                      }`
                    }
                    value={distro}
                  >
                    <span
                      className={`block truncate ${
                        search ? "font-bold" : "font-normal"
                      }`}
                    >
                      {distro.name}
                    </span>
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
