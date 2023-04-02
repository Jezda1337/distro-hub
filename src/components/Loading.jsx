export default function Loading() {
	return (
		<div className="relative  grid place-items-center">
			<div className="aspect-square w-8 animate-scale rounded-full border-2 border-black"></div>
			<div className="absolute aspect-square w-8 animate-scale_delay rounded-full border-2 border-black"></div>
		</div>
	)
}
