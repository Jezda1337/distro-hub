import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState, FormEvent } from "react";
import { Button } from "./ui/Button";
import { Dialog } from "./ui/Dialog";
import { Input } from "./ui/Input";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [distroName, setDistoName] = useState("");
  const [distroWeb, setDistoWeb] = useState("");

  function handleOpen() {
    setOpen(!open);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOpen(false);
    console.log(distroName);
    console.log(distroWeb);
  }

  return (
    <header className="flex justify-between md:mt-12">
      <h1 className="text-2xl font-bold">DistroHub</h1>
      <Button
        onClick={() => setOpen(!open)}
        className="bg-black text-white text-xl"
      >
        Submit distro
      </Button>

      <div
        className={` ${
          open ? "grid" : "hidden"
        } absolute z-10 backdrop-blur-sm inset-0 place-items-center`}
        onClick={handleOpen}
      >
        <Dialog
          onClick={(e) => e.stopPropagation()}
          open={open}
          className="bg-white shadow rounded border w-4/12 h-1/4"
        >
          <header className="flex justify-between items-center">
            <p className="text-lg">Submit distro</p>
            <Button onClick={handleOpen}>
              <XMarkIcon className="w-5 h-5" />
            </Button>
          </header>
          <form method="POST" onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <Input
                name="distroName"
                required={true}
                onChange={(e) => setDistoName(e.target.value)}
                placeholder="Distro name"
              />
            </div>
            <div>
              <Input
                name="distroWeb"
                required={true}
                onChange={(e) => setDistoWeb(e.target.value)}
                placeholder="Distro website"
              />
            </div>
            <div className="mt-6 text-right">
              <Button>Submit</Button>
            </div>
          </form>
        </Dialog>
      </div>
    </header>
  );
}
