import Image from "next/image";
import Link from "next/link";

interface Distro {
  id: number;
  name: string;
  logo: string;
  popularity: string;
  category: string[];
  website: string;
}

export default function WaitingDistroCard({ distro }: { distro: Distro }) {
  return (
    <article className="w-full flex items-center border rounded border-gray-500 px-4 py-1 my-3 md:hover:shadow-lg md:hover:transition-all">
      <div>
        <Image src={distro.logo} alt="" width={32} height={32} />
      </div>

      <h3 className="ml-4 font-bold">{distro.name}</h3>
      <Link className="ml-auto" href={distro.website}>
        <p className="ml-auto">website</p>
      </Link>
    </article>
  );
}
