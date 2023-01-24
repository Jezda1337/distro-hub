export default function Header() {
  return (
    <header className="flex justify-between md:mt-12">
      <h1 className="text-2xl font-bold">Distros</h1>
      <button className="bg-black px-3 py-1 text-white rounded text-xl">
        Submit distro
      </button>
    </header>
  );
}
