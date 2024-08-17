import Link from "next/link"

export const runtime = "experimental-edge"

export default function Custom404() {
	return (
		<>
			<section className="mt-28 grid place-items-center">
				<div className="flex flex-col items-center">
					<h2 className="text-3xl">Oops, I think you got lost?</h2>
					<p className="mt-2 w-full text-left text-2xl">
						let&#39;s go{" "}
						<Link
							className="font-bold transition-colors hover:text-slate-500"
							href="/">
							Home
						</Link>
					</p>
				</div>
			</section>
		</>
	)
}
