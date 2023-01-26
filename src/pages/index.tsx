import DistroCard from "@/components/DistroCard";
import Filters from "@/components/Filters";
import Header from "@/components/Header";
import WorkInProgressBar from "@/components/WorkInProgressBar";
import { MyContext } from "@/context";
import { Poppins } from "@next/font/google";
import { useContext } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
export default function Home() {
  const { list } = useContext(MyContext);
  return (
    <section className={`max-w-4xl mx-auto ${poppins.className}`}>
      <Header />
      <Filters />
      <h1 className="text-3xl font-bold mb-8">Most Popular</h1>

      {list.map((distro: any) => (
        <DistroCard key={distro.id} distro={distro} />
      ))}
      <WorkInProgressBar />
    </section>
  );
}
