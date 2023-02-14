import { Distro } from "@/interfaces/distro.interface";
import Link from "next/link";
// @ts-ignore
import { CldImage } from "next-cloudinary";

export default function DistroCard({ distro }: { distro: Distro }) {
  return (
    <article className="my-3 flex w-full items-center rounded border border-gray-500 px-4 py-1 md:hover:shadow-lg md:hover:transition-all">
      <div>
        <CldImage
          alt="test"
          src={distro.logo}
          width="0"
          height="0"
          className="h-8 w-8"
          format="svg"
        />
      </div>

      <h3 className="ml-4 font-bold">{distro.name}</h3>
      <Link className="ml-auto" href={"/" + distro.name.toLowerCase()}>
        <p className="ml-auto">read more</p>
      </Link>
    </article>
  );
}
