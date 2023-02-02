import WaitingDistroCard from "@/components/WaitingDistroCard";
import waiting_list from "@/waiting_list.json";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/waitingList/get");
  const data = await res.json();

  function isEmpty(obj: any) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  if (isEmpty(data)) {
    return {
      props: {
        data: waiting_list,
      },
    };
  } else {
    return {
      props: {
        data,
      },
    };
  }
}

interface Distro {
  id: number;
  name: string;
  image: string;
  popularity: string;
  category: string[];
}
interface Props {
  data: Distro[];
}

export default function WaitingList({ data }: Props) {
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
      {data.length !== 0 ? (
        data.map((distro: any) => (
          <WaitingDistroCard key={distro.id} distro={distro} />
        ))
      ) : (
        <p className="font-bold text-center mt-7 text-2xl">
          No waiting distros.
        </p>
      )}
    </section>
  );
}
