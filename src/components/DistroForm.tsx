import { XMarkIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/Button";
import { Dialog } from "./ui/Dialog";
import { Input } from "./ui/Input";

interface Props {
  handleOpen(): void;
  setOpen(open: boolean): void;
  open: boolean;
}

export default function DistroForm({ handleOpen, setOpen, open }: Props) {
  const [newDistro, setNewDistro] = useState({
    email: "",
    name: "",
    website: "",
    message: "",
    logo: "",
  });

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const target = event.target;
    setNewDistro({
      ...newDistro,
      [target.name]: target.value,
    });
  }
  function handleImages(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files![0]; // using ! is not recommendent should finde better way
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      console.log(reader.result);
      setNewDistro({ ...newDistro, logo: reader.result as string });
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOpen(false);

    try {
      const res = await fetch("/api/waitingList/create", {
        method: "POST",
        body: JSON.stringify(newDistro),
      });
      console.log(await res.json());
      return res.status;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={`${
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
            <input
              onChange={handleImages}
              type="file"
              name="logo"
              required={true}
              placeholder="Distro logo"
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
  );
}
