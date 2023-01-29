import Image from "next/image";
import Link from "next/link";

interface Distro {
  id: number;
  name: string;
  logo: string;
  website: string;
  submited_date: string;
}

export default function WaitingDistroCard({ distro }: { distro: Distro }) {
  return (
    <article className="w-full flex justify-between items-center border rounded border-gray-500 px-4 py-1 my-3 md:hover:shadow-lg md:hover:transition-all">
      <div>
        <Image src={distro.logo} alt="" width={32} height={32} />
      </div>

      <div className="flex w-full items-center">
        <h3 className="ml-4 w-full font-bold">{distro.name}</h3>
        <h3 className="w-full text-center font-medium">
          {distro.submited_date}
        </h3>
      </div>

      <Link className="ml-auto" href={distro.website}>
        <p className="ml-auto">website</p>
      </Link>
    </article>
  );
}
