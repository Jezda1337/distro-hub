import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { FormEvent, useState, ChangeEvent } from "react";
import DropdownMenu from "./DropdownMenu";
import { Button } from "./ui/Button";
import { Dialog } from "./ui/Dialog";
import { Input } from "./ui/Input";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [newDistro, setNewDistro] = useState({
    email: "",
    name: "",
    website: "",
    message: "",
  });

  function handleOpen() {
    setOpen(!open);
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target;
    setNewDistro({
      ...newDistro,
      [target.name]: target.value,
    });
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setOpen(false);

    console.log(newDistro);
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
        <div
          className={` ${
            open ? "grid" : "hidden"
          } absolute z-10 backdrop-blur-sm inset-0 place-items-center`}
          onClick={handleOpen}
        >
          <Dialog
            onClick={(e) => e.stopPropagation()}
            open={open}
            className="bg-white shadow rounded border w-11/12 md:w-4/12"
          >
            <header className="flex justify-between items-center border-b pb-3 mb-3">
              <p className="text-lg font-medium">Submit distro</p>
              <Button onClick={handleOpen}>
                <XMarkIcon className="w-5 h-5" />
              </Button>
            </header>
            <form
              method="POST"
              onSubmit={handleSubmit}
              className="mt-4 flex flex-col gap-4"
            >
              <div>
                <Input
                  onChange={handleChange}
                  name="email"
                  required={true}
                  placeholder="Email"
                />
              </div>
              <div>
                <Input
                  onChange={handleChange}
                  name="name"
                  required={true}
                  placeholder="Distro name"
                />
              </div>
              <div>
                <Input
                  onChange={handleChange}
                  name="website"
                  required={true}
                  placeholder="Distro website"
                />
              </div>
              <div>
                <textarea
                  onChange={handleChange}
                  className="border rounded focus:outline-black w-full px-3 py-2"
                  name="message"
                  required={true}
                  placeholder="Distro Brief"
                />
              </div>
              <div className="mt-6 text-right">
                <Button>Submit</Button>
              </div>
            </form>
          </Dialog>
        </div>
      ) : null}
    </header>
  );
}
