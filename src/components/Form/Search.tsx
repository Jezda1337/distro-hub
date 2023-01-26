import { MyContext } from "@/context";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { Input } from "../ui/Input";

export default function Test() {
  // const [search, setSearch] = useState("");
  const { setSearch } = useContext(MyContext);

  function handleSearch(e: any) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <div className="h-9 relative w-[255px]">
      <Input
        onChange={handleSearch}
        placeholder="Search by name .."
        autoComplete="off"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
        <MagnifyingGlassIcon
          className="h-5 w-5  text-gray-400"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
