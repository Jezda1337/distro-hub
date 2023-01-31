import Image from "next/image";
import Link from "next/link";

interface Distro {
  id: number;
  name: string;
  logo: string;
  website: string;
  submited_date: string;
  createdAt: Date;
}

export default function WaitingDistroCard({ distro }: { distro: Distro }) {
  const submittedDate = new Date(distro.createdAt);

  function toJSONLocal(date: Date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }

  return (
    <article className="w-full flex justify-between items-center border rounded border-gray-500 px-4 py-1 my-3 md:hover:shadow-lg md:hover:transition-all">
      <div>
        <Image
          src={distro.logo ? distro.logo : "/images/arch.svg"}
          alt="test"
          width={32}
          height={32}
        />
      </div>

      <div className="flex w-full items-center">
        <h3 className="ml-4 w-full font-bold">{distro.name}</h3>
        <h3 className="w-full text-center font-medium">
          {toJSONLocal(submittedDate)}
        </h3>
      </div>

      <Link className="ml-auto" href={distro.website}>
        <p className="ml-auto">website</p>
      </Link>
    </article>
  );
}
