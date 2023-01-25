import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";

interface Option {
  id: number;
  name: string;
  category: string[];
  popularity?: string;
}

interface Props {
  options?: { id: number; name: string; category?: string[] }[];
  placeholder: string;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Select({ options, placeholder }: Props) {
  const [selected, setSelected] = useState("");
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative mt-1 w-56">
            {/* <Listbox.Label>Assignee:</Listbox.Label> */}
            <Listbox.Button className="relative h-9 w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left sm:text-sm">
              <span className="block truncate font-bold">
                {selected ? (
                  selected
                ) : (
                  <span className="text-slate-500">{placeholder}</span>
                )}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options?.map(({ id, name }) => (
                  <Listbox.Option
                    key={id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-black" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={name}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-black",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
function useContext(MyContext: any): { test: any } {
  throw new Error("Function not implemented.");
}
