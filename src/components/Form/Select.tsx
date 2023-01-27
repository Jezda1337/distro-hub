import { useState } from "react";
import Image from "next/image";

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

interface Props {
  options: {
    id: number;
    name: string;
    image: string;
  }[];
  placeholder: string;
}

export default function Select({ options, placeholder }: Props) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<{
    id: number;
    name: string;
    image: string;
  } | null>(null);

  function handleShow() {
    setShow(!show);
  }

  function handleSelection(selectedValue: any) {
    setSelected(selectedValue);
  }
  function handleBlur() {
    setShow(false);
  }
  return (
    <div
      tabIndex={-1}
      onClick={handleShow}
      onBlur={handleBlur}
      className="w-full md:w-56 relative bg-white border rounded h-9"
    >
      <button
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        type="button"
        className="w-full flex items-center h-full focus:outline focus:outline-black rounded focus:outline-2"
      >
        <span className="block text-left py-2 px-3 w-full h-full leading-none">
          {selected ? (
            <div className="flex items-center">
              <div className="mr-3">
                <Image src={selected.image} width={20} height={20} alt="" />
              </div>
              <span> {selected.name}</span>
            </div>
          ) : (
            <span className="text-slate-400">{placeholder}</span>
          )}
        </span>
        <span className="absolute block right-3">
          <ChevronUpDownIcon className="w-6 h-6 text-gray-500" />
        </span>
      </button>

      <ul
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
        className={`absolute z-10 top-[calc(100%+1rem)] max-h-44 overflow-auto shadow w-full bg-inherit rounded px-0 mx-0 border border-black list-none
          ${show ? "block" : "hidden"}`}
      >
        {options.map((option: { id: number; name: string; image: string }) => (
          <li
            role="menuitem"
            tabIndex={-1}
            className={`flex items-center hover:text-white hover:bg-black hover:cursor-pointer px-2 py-1 ${
              option.name === selected?.name ? "bg-black text-white" : null
            }`}
            onMouseDown={() => handleSelection(option)}
            key={option.id}
          >
            <div className="mr-3">
              <Image
                src={`${option?.image}`}
                width={16}
                height={16}
                alt="some image"
              />
            </div>
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
