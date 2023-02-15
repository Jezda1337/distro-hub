import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
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

  console.log(data);

  return (
    <>
      <h1>hello world</h1>
      {data.name}
    </>
  );
}
