// import { ConvertToBase64 } from "@/helpers/convertToBase64";
import { IsFileSizeOk } from "@/helpers/fileSize.validator";
import type { DistroForm } from "@/interfaces/distroInput.interfaces";
import { DocumentPlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/Button";
import { Dialog } from "./ui/Dialog";
import { Input } from "./ui/Input";
import { InputFile } from "./ui/InputFile";
import Image from "next/image";

interface Props {
  handleOpen(): void;
  setOpen(open: boolean): void;
  open: boolean;
}

export default function DistroForm({ handleOpen, setOpen, open }: Props) {
  const [newDistro, setNewDistro] = useState<DistroForm>({
    name: "",
    website: "",
    description: "",
    logo: "",
    basedOn: "",
    desktopEnvironments: [],
    downloadLink: "",
    distroScreenShoots: [],
  });

  // const router = useRouter();

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const target = event.target;
    console.log(target.value);

    if (target.name === "desktopEnvironments") {
      console.log(target.value);
      // setNewDistro({ ...newDistro, desktopEnvironments: [target.value] });
    }

    setNewDistro({
      ...newDistro,
      [target.name]: target.value,
    });
  }

  async function handleLogo(file: File) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "distro_logos");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/db1fkstfm/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    return await data.json();
  }

  async function handleImages(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files![0]; // using ! is not recommendent should finde better way
    let data = null;

    if (IsFileSizeOk(selectedFile?.size)) {
      data = await handleLogo(selectedFile);
    }

    if (!selectedFile || data === null) return;
    setNewDistro({ ...newDistro, logo: data.public_id });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // setOpen(false);
    console.table(newDistro);

    // try {
    //   const res = await fetch(`${process.env.base_api}/waitingList`, {
    //     method: "POST",
    //     body: JSON.stringify(newDistro),
    //   });
    //   router.replace(router.asPath);
    //   return res.status;
    // } catch (error) {
    //   console.error(error);
    // }
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
        className="h-11/12 w-11/12 max-w-4xl rounded border bg-white shadow"
      >
        <header className="mb-3 flex items-start justify-between border-b pb-3">
          <div>
            <p className="text-lg font-medium">Submit distro</p>
            <p className="text-sm text-slate-500">Please fill in the fields.</p>
          </div>
          <Button onClick={handleOpen}>
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </header>
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Ex. Ubuntu"
              label="Disto name"
            />
            <Input
              type="text"
              name="desktopEnvironments"
              onChange={handleChange}
              placeholder="Ex. Gnome"
              label="Desktop environments"
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              type="text"
              name="website"
              onChange={handleChange}
              placeholder="ubuntu.org"
              label="Website"
            />
            <Input
              type="text"
              name="downloadLink"
              onChange={handleChange}
              prefixText={true}
              className="rounded-l-none"
              placeholder="www.example.com"
              label="Download link/page"
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="gal-4 flex w-full items-end">
              <Image
                src={"/images/arch.svg"}
                alt="Logo"
                width={0}
                height={0}
                className="aspect-square w-16"
              />
              <InputFile
                name="logo"
                label="Upload"
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <Input
              type="text"
              name="basedOn"
              onChange={handleChange}
              label="Based on"
              placeholder="Ex. Debian"
            />
          </div>
          <div>
            <label className="mb-1 inline-block text-base">About</label>
            <textarea
              onChange={handleChange}
              className="h-32 w-full rounded border px-3 py-2 focus:outline-black"
              name="description"
              required={true}
              placeholder="Brief description od distro"
            />
            <span className="text-sm text-slate-500">
              Brief description of distribution.
            </span>
          </div>
          <div>
            <span className="mb-1 inline-block">Distro screenshots</span>
            <label
              htmlFor="screenShoots"
              className="group flex h-32 w-full flex-col place-items-center justify-center rounded border border-dashed md:hover:cursor-pointer md:hover:border-solid md:hover:transition-all"
            >
              <DocumentPlusIcon className="transition-hover relative aspect-square w-8 group-hover:scale-125" />
              <span className="text-blue-500">Upload files</span>
              <span className="text-slate-500">PNG, JPG, WEBP</span>
            </label>
            <input
              type="file"
              name="distroScreenShoots"
              // onChange={handleChange}
              onChange={(e) => console.log(e.target.files)}
              accept=".png, .jpg, .jpge, .webp"
              multiple
              className="hidden"
              id="screenShoots"
            />
          </div>
          <div className="self-end">
            <Button>Submit</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
