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
        <h1 className="text-2xl font-bold transition-all hover:scale-110">
          DistroHub
        </h1>
      </Link>
      <div className="flex gap-6">
        <DropdownMenu />
        <Button onClick={handleOpen} className="text-xl">
          Submit distro
        </Button>
      </div>

      {open ? (
        <DistroForm handleOpen={handleOpen} open setOpen={setOpen} />
      ) : null}
    </header>
  );
}
