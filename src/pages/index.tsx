import DistroCard from "@/components/DistroCard";
import Filters from "@/components/Filters";
import Header from "@/components/Header";
import SubmitDsitro from "@/components/SubmitDistro";
import { MyContext } from "@/context";
import { Poppins } from "@next/font/google";
import { useContext } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
export default function Home() {
  const { list, popUp } = useContext(MyContext);
  // console.log("-------------");
  // console.log(list);
  // console.log("-------------");
  return (
    <section className={`max-w-4xl mx-auto ${poppins.className}`}>
      <Header />
      <Filters />
      <h1 className="text-3xl font-bold mb-8">Most Popular</h1>

      {list.map((distro: any) => (
        <DistroCard key={distro.id} distro={distro} />
      ))}

      <div
        className={`${
          popUp ? "block" : "hidden"
        } absolute inset-0 bg-[rgba(0,0,0, .5)]`}
      >
        <div>{popUp ? <SubmitDsitro /> : null}</div>
      </div>
    </section>
  );
}
