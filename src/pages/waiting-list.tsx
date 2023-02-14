import WaitingDistroCard from "@/components/WaitingDistroCard";
import { Distro } from "@/interfaces/distro.interface";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/waitingList/get");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

interface Props {
  data: Distro[];
}

export default function WaitingList({ data }: Props) {
  return (
    <section className="mt-40">
      <div className="flex w-full items-center justify-between border-gray-500 px-4 py-1 text-sm text-slate-500">
        <div className="w-full">
          <span>Logo</span>
          <span className="mx-1">|</span>
          <span>Name</span>
        </div>
        <div className="flex w-full justify-end text-end">
          <span className="w-full text-center">Submited date</span>
        </div>
        <span className="ml-auto">Details</span>
      </div>
      {data.length !== 0 ? (
        data.map((distro: Distro) => (
          <WaitingDistroCard key={distro.id} distro={distro} />
        ))
      ) : (
        <p className="mt-7 text-center text-2xl font-bold">
          No waiting distros.
        </p>
      )}
    </section>
  );
}
