import DistroCard from "@/components/DistroCard";
import Filters from "@/components/Filters";
import WorkInProgressBar from "@/components/WorkInProgressBar";
import { Distro } from "@/interfaces/distro.interface";
// import { MyContext } from "@/context";
// import { useContext } from "react";

export default function Home({ data }: { data: Distro[] }) {
  // const { list } = useContext(MyContext);

  return (
    <section>
      <Filters />
      <h1 className="mb-8 text-3xl font-bold">Most Popular</h1>

      <div className="mb-4 flex items-center px-4 text-sm text-slate-500">
        <div>
          <span>Logo</span>
          <span className="mx-2">|</span>
          <span>Name</span>
        </div>
        <span className="ml-auto">Details</span>
      </div>

      {data.length != 0 ? (
        data.map((distro: Distro) => (
          <DistroCard key={distro.id} distro={distro} />
        ))
      ) : (
        <p className="mt-7 text-center text-2xl font-bold">Nothing found.</p>
      )}
      <WorkInProgressBar />
    </section>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/v1/distro");
  const data = await response.json();

  return {
    props: {
      data: data,
    },
  };
}
