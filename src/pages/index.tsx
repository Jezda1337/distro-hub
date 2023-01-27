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

      {list.map(
        (distro: {
          id: number;
          image: string;
          name: string;
          popularity: string;
          category: string[];
        }) => (
          <DistroCard key={distro.id} distro={distro} />
        )
      )}
      <WorkInProgressBar />
    </section>
  );
}
