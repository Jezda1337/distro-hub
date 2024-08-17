import Head from "next/head"

export const runtime = "experimental-edge"

export default function About() {
	return (
		<>
			<Head>
				<title>DistroHub - About</title>
			</Head>
			<section className="mt-12">
				<h1 className="text-center text-2xl">
					About page is still in development.
				</h1>
			</section>
		</>
	)
}
