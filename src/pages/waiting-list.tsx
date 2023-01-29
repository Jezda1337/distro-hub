import WaitingDistroCard from "@/components/WaitingDistroCard";
import waiting_list from "@/waiting_list.json";

export default function WaitingList() {
  return (
    <section className="mt-40">
      <div className="w-full flex justify-between text-sm text-slate-500 items-center border-gray-500 px-4 py-1">
        <div className="w-full">
          <span>Logo</span>
          <span className="mx-1">|</span>
          <span>Name</span>
        </div>
        <div className="flex w-full text-end justify-end">
          <span className="w-full text-center md:mr-9">Submited date</span>
        </div>
        <span className="ml-auto">Details</span>
      </div>
      {waiting_list.map((distro) => (
        <WaitingDistroCard key={distro.id} distro={distro} />
      ))}
    </section>
  );
}
