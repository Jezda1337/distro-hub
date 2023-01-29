import DistroForm from "@/components/DistroForm";
import Link from "next/link";
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { Button } from "./ui/Button";

export default function Header() {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <header className="mt-14 flex justify-between md:mt-12">
      <Link href="/">
        <h1 className="text-2xl font-bold">DistroHub</h1>
      </Link>
      <div className="flex gap-6">
        <DropdownMenu />
        <Button
          onClick={handleOpen}
          className="bg-black text-white text-xl border-none relative after:border after:absolute after:inset-0 after:translate-x-1 after:translate-y-1 hover:after:translate-x-2 hover:after:translate-y-2 after:-z-10 after:rounded after:transition-all hover:after:bg-black"
        >
          Submit distro
        </Button>
      </div>

      {open ? (
        <DistroForm handleOpen={handleOpen} open setOpen={setOpen} />
      ) : null}
    </header>
  );
}
