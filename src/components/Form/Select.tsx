import { useContext, useState } from "react";

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { MyContext } from "@/context";

const list = [
  {
    id: 1,
    value: "value 1",
  },
  {
    id: 2,
    value: "value 2",
  },
  {
    id: 3,
    value: "value 3",
  },
];

export default function App() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("");
  // const { list } = useContext(MyContext);

  function handleShow() {
    setShow(!show);
  }

  function handleSelection(selectedValue: string) {
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
      className="w-56 relative bg-white border rounded h-9"
    >
      <button
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        type="button"
        className="w-full flex items-center h-full"
      >
        <span className="block text-left py-2 px-3 w-full h-full leading-none">
          {selected ? (
            selected
          ) : (
            <span className="text-slate-400">Select ..</span>
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
        className={`absolute top-[calc(100%+1rem)] max-h-44 overflow-scroll shadow w-full bg-inherit rounded px-0 mx-0 border border-black list-none
          ${show ? "block" : "hidden"}`}
      >
        {list.map((li) => (
          <li
            role="menuitem"
            tabIndex={-1}
            className={`hover:text-white hover:bg-black hover:cursor-pointer px-2 py-1`}
            onMouseDown={() => handleSelection(li.value)}
            key={li.id}
          >
            {li.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
