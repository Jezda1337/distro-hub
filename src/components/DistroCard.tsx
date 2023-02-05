import Image from "next/image"
import Link from "next/link"

interface Distro {
  id: number
  name: string
  image: string
  popularity: string
  category: string[]
}

export default function DistroCard({ distro }: { distro: Distro }) {
  return (
    <article className="w-full flex items-center border rounded border-gray-500 px-4 py-1 my-3 md:hover:shadow-lg md:hover:transition-all">
      <div>
        <Image
          src={distro.image}
          alt=""
          width="0"
          height="0"
          className="w-8 h-8"
        />
      </div>

      <h3 className="ml-4 font-bold">{distro.name}</h3>
      <Link className="ml-auto" href={"/" + distro.name.toLowerCase()}>
        <p className="ml-auto">read more</p>
      </Link>
    </article>
  )
}
