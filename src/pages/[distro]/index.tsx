import { Button } from "@/components/ui/Button";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
// @ts-ignore
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useRouter } from "next/router";

async function getDistro({ queryKey }: any) {
  const [_, distro] = queryKey;
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/distro/${distro}`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getServerSideProps({ params }: any) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["distro", params["distro"]], getDistro);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Distro() {
  const { query } = useRouter();

  const { data } = useQuery({
    queryKey: ["distro", query.distro],
    queryFn: getDistro,
  });

  const colors = ["red", "green", "blue"];

  return (
    <section className="my-20">
      <div className="my-20 h-[300px] w-full bg-red-100"></div>
      <div className="flex items-end">
        <CldImage
          alt="test"
          src={data.logo}
          width="0"
          height="0"
          className="h-12 w-12"
          format="svg"
        />
        <h2 className=" ml-4 text-2xl">{data.name}</h2>

        <div className="ml-auto flex gap-4">
          <Button className="">
            <Link href={data.website}>web</Link>
          </Button>
          <Button className="">
            {/* href need change */}
            <Link href={data.download || ""}>download</Link>
          </Button>
        </div>
      </div>
      <div className="mt-20">
        <h2 className=" relative my-4 text-2xl first-letter:uppercase after:absolute after:top-1/2 after:ml-5 after:h-[3px] after:w-12 after:-translate-y-1/2 after:rounded-full after:bg-black">
          About
        </h2>
        <p className="">{data.description}</p>
      </div>
    </section>
  );
}
