import Image from "next/image";
import Link from "next/link";

interface Distro {
  id: number;
  name: string;
  image: string;
  popularity: string;
  category: string[];
}

export default function DistroCard({ distro }: { distro: Distro }) {
  return (
    <article className="my-3 flex w-full items-center rounded border border-gray-500 px-4 py-1 md:hover:shadow-lg md:hover:transition-all">
      <div>
        <Image
          src={`${process.env.cloudinary_logos + "/logos/" + distro.image}.svg`}
          alt=""
          width="0"
          height="0"
          className="h-8 w-8"
        />
      </div>

      <h3 className="ml-4 font-bold">{distro.name}</h3>
      <Link className="ml-auto" href={"/" + distro.name.toLowerCase()}>
        <p className="ml-auto">read more</p>
      </Link>
    </article>
  );
}
