import { MyContext } from "@/context";
import { useContext } from "react";

export default function Header() {
  const { popUp, setPopUp } = useContext(MyContext);

  return (
    <header className="flex justify-between md:mt-12">
      <h1 className="text-2xl font-bold">DistroHub</h1>
      <button
        onClick={() => setPopUp(!popUp)}
        className="bg-black px-3 py-1 text-white rounded text-xl relative after:absolute after:inset-0 after:bg-white after:border after:rounded after:border-black after:-z-10 after:translate-x-1 after:translate-y-1 hover:after:translate-x-2 hover:after:translate-y-2 after:transition-all"
      >
        Submit distro
      </button>
    </header>
  );
}
