import { useRouter } from "next/router";

// TODO need to fetch single distro and disto data, display on the screen.
export async function getServerSideProps({ params }: any) {
  const response = await fetch(
    `http://localhost:3000/api/v1/distro/${params.distro}`
  );

  console.log(response);
  return {
    props: {
      data: [],
    },
  };
}

export default function Distro() {
  const router = useRouter();
  const { distro } = router.query;

  console.log(distro);

  return (
    <>
      <h1>hello world</h1>
    </>
  );
}
