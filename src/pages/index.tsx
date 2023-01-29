import DistroCard from "@/components/DistroCard";
import Filters from "@/components/Filters";
import WorkInProgressBar from "@/components/WorkInProgressBar";
import { MyContext } from "@/context";
import { useContext } from "react";

export default function Home() {
  const { list } = useContext(MyContext);
  return (
    <section>
      <Filters />
      <h1 className="text-3xl font-bold mb-8">Most Popular</h1>

      <div className="flex text-sm items-center px-4 mb-4 text-slate-500">
        <div>
          <span>Logo</span>
          <span className="mx-1">|</span>
          <span>Name</span>
        </div>
        <span className="ml-auto">Details</span>
      </div>

      {list.length != 0 ? (
        list.map(
          (distro: {
            id: number;
            image: string;
            name: string;
            popularity: string;
            category: string[];
          }) => <DistroCard key={distro.id} distro={distro} />
        )
      ) : (
        <p className="font-bold text-center mt-7 text-2xl">Nothing found.</p>
      )}
      <WorkInProgressBar />
    </section>
  );
}
