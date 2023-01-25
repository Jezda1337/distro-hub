import Image from "next/image"

interface Distro {
  id: number
  name: string
  popularity: string
  category: string[]
}

export default function DistroCard({ distro }: { distro: Distro }) {
  return (
    <article className="w-full flex border rounded border-gray-500 px-4 py-1 my-3">
      <div>
        <Image src="next.svg" alt="" width={100} height={100} />
      </div>

      <h3 className="ml-4 font-bold">{distro.name}</h3>
      <p className="ml-auto">website</p>
    </article>
  )
}
