import WaitingDistroCard from "@/components/WaitingDistroCard";
import waiting_list from "@/waiting_list.json";

export default function WaitingList() {
  return (
    <section className="mt-40">
      {waiting_list.map((distro) => (
        <WaitingDistroCard key={distro.id} distro={distro} />
      ))}
    </section>
  );
}
