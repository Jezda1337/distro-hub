import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

interface Props {
  options: {
    de: {
      id: number;
      name: string;
      image: string;
    }[];
    wm: {
      id: number;
      name: string;
      image: string;
    }[];
  };
  placeholder: string;
  setSelect(selected: any): void;
}

interface Selected {
  id: number;
  name: string;
  image: string;
}

export default function Select({
  options,
  placeholder,
  setSelect,
}: {
  // options: Props["options"] | { id: number; name: string; image: string }[];
  options: any;
  placeholder: Props["placeholder"];
  setSelect: Props["setSelect"];
}) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<Selected | null>();

  function handleShow() {
    setShow(!show);
  }

  function handleSelection(selectedValue: any) {
    if (selectedValue.name === "none") {
      setSelected(null);
      setSelect("");
      return;
    }
    setSelected(selectedValue);
    setSelect(selectedValue);
  }

  function handleBlur() {
    setShow(false);
  }

  return (
    <div
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
                <Image
                  src={selected.image}
                  width="0"
                  height="0"
                  className="w-5 h-5"
                  alt=""
                />
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
        className={`absolute z-10 top-[calc(100%+1rem)] max-h-44 overflow-auto shadow w-full bg-inherit rounded px-0 mx-0 border border-black list-none
          ${show ? "block" : "hidden"}`}
      >
        {Object.hasOwn(options, "de") ? (
          <li className="px-2 py-1 font-bold border-b mb-2">
            Desktop Environment
          </li>
        ) : null}
        {Object.hasOwn(options, "de")
          ? options.de.map(
              (option: { id: number; name: string; image: string }) => (
                <li
                  role="menuitem"
                  className={`flex items-center hover:text-white hover:bg-black hover:cursor-pointer px-2 py-1 ${
                    option.name === selected?.name
                      ? "bg-black text-white"
                      : null
                  }`}
                  onMouseDown={() => handleSelection(option)}
                  key={option.id}
                >
                  <div tabIndex={0} className="mr-3">
                    <Image
                      src={`${option?.image}`}
                      width="0"
                      height="0"
                      className="w-5 h-5"
                      alt="some image"
                    />
                  </div>
                  {option.name}
                </li>
              )
            )
          : options.map(
              (option: { id: number; name: string; image: string }) => (
                <li
                  role="menuitem"
                  className={`flex items-center hover:text-white hover:bg-black hover:cursor-pointer px-2 py-1 ${
                    option.name === selected?.name
                      ? "bg-black text-white"
                      : null
                  }`}
                  onMouseDown={() => handleSelection(option)}
                  key={option.id}
                >
                  <div tabIndex={0} className="mr-3">
                    <Image
                      src={`${option?.image}`}
                      width="0"
                      height="0"
                      className="w-5 h-5"
                      alt="some image"
                    />
                  </div>
                  {option.name}
                </li>
              )
            )}
        {Object.hasOwn(options, "wm") ? (
          <div className="px-2 py-1 font-bold border my-2">Window Menager</div>
        ) : null}
        {Object.hasOwn(options, "wm")
          ? options.wm.map(
              (option: { id: number; name: string; image: string }) => (
                <li
                  role="menuitem"
                  className={`flex items-center hover:text-white hover:bg-black hover:cursor-pointer px-2 py-1 ${
                    option.name === selected?.name
                      ? "bg-black text-white"
                      : null
                  }`}
                  onMouseDown={() => handleSelection(option)}
                  key={option.id}
                >
                  <div tabIndex={0} className="mr-3">
                    <Image
                      src={`${option?.image}`}
                      width="0"
                      height="0"
                      className="w-5 h-5"
                      alt="some image"
                    />
                  </div>
                  {option.name}
                </li>
              )
            )
          : null}
      </ul>
    </div>
  );
}
