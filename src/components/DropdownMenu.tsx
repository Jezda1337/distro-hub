import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/Button";

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener(
      "click",
      (e: MouseEvent) => {
        if (!menuRef.current?.contains(e.target as HTMLElement)) {
          setOpen(false);
        }
      },
      true
    );
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <Button onClick={() => setOpen(!open)}>
        {!open ? (
          <Bars3BottomRightIcon className="w-6 h-6" />
        ) : (
          <XMarkIcon className="w-6 h-6" />
        )}
      </Button>
      {open ? (
        <div className="absolute right-0 borderpy-3 border rounded mt-3 z-10 bg-white min-w-[150px] shadow">
          <ul className="py-2">
            <li className="border-b px-5 pb-2">
              <p className="font-medium">Menu</p>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link
                className="block hover:text-white hover:bg-black px-5 py-2"
                href={"/waiting-list"}
              >
                Waiting list
              </Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link
                className="block hover:text-white hover:bg-black px-5 py-2"
                href={"/about"}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
