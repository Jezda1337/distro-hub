import Header from "@/components/Header";
import Filters from "@/components/Filters";

export default function Home() {
  return (
    <section className="max-w-4xl mx-auto">
      <Header />
      <Filters />
      <h1 className="text-3xl font-bold">Most Popular</h1>
    </section>
  );
}
