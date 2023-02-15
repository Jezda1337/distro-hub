// import { ConvertToBase64 } from "@/helpers/convertToBase64";
import { IsFileSizeOk } from "@/helpers/fileSize.validator";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/Button";
import { Dialog } from "./ui/Dialog";
import { Input } from "./ui/Input";
import { InputFile } from "./ui/InputFile";

interface Props {
  handleOpen(): void;
  setOpen(open: boolean): void;
  open: boolean;
}

export default function DistroForm({ handleOpen, setOpen, open }: Props) {
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState(false);
  const [newDistro, setNewDistro] = useState({
    email: "",
    name: "",
    website: "",
    description: "",
    logo: "",
  });

  const router = useRouter();

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const target = event.target;
    setNewDistro({
      ...newDistro,
      [target.name]: target.value,
    });
  }

  async function handleLogo(file: any) {
    setFileName(file?.name);

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
      setFileName(selectedFile?.name);
      setFileError(false);
      data = await handleLogo(selectedFile);
    } else {
      setFileName("");
      setFileError(true);
    }

    if (!selectedFile || data === null) return;
    // const logoBase64 = (await ConvertToBase64(selectedFile)) as string;

    setNewDistro({ ...newDistro, logo: data.public_id });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOpen(false);

    try {
      const res = await fetch("/api/waitingList/create", {
        method: "POST",
        body: JSON.stringify(newDistro),
      });
      router.replace(router.asPath);
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
        className="w-11/12 rounded border bg-white shadow md:w-6/12"
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
          <div>
            <Input
              onChange={handleChange}
              name="email"
              type="email"
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
          <div className="flex items-center">
            <div className="mr-2 h-9 rounded border px-3 py-2 leading-none md:mr-4">
              www.
            </div>
            <Input
              className="w-full"
              onChange={handleChange}
              name="website"
              required={true}
              placeholder="Distro website"
            />
          </div>
          <div>
            <InputFile
              className={`${fileName != "" ? "bg-green-400" : ""} ${
                fileError ? "bg-red-500" : ""
              }`}
              accept=".jpg, .jpeg, .svg, .png, .webp"
              onChange={handleImages}
              label={fileName ? fileName : fileError ? "File is too big" : ""}
            />
          </div>
          <div>
            <textarea
              onChange={handleChange}
              className="w-full rounded border px-3 py-2 focus:outline-black"
              name="description"
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
