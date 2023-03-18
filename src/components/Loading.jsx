export default function Loading() {
	return (
		<div className="relative mt-16 grid place-items-center">
			<div className="animate-scale aspect-square w-8 rounded-full border-2 border-black"></div>
			<div className="animate-scale_delay absolute aspect-square w-8 rounded-full border-2 border-black"></div>
		</div>
	)
}
