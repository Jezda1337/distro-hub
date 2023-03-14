import { NoSymbolIcon } from "@heroicons/react/20/solid";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

interface Props {
	options: {
		de: {
			id: number;
			name: string;
			image?: string;
		}[];
		wm: {
			id: number;
			name: string;
			image?: string;
		}[];
	};
	placeholder: string;
}

export default function Select({
	options,
	placeholder,
	ctxState: selected,
	ctxSetState,
}: {
	// options: Props["options"] | { id: number; name: string; image: string }[];
	options: any; // this needs to be fixed
	placeholder: Props["placeholder"];
	ctxState: any;
	ctxSetState: any;
}) {
	const [show, setShow] = useState(false);

	function handleShow() {
		setShow(!show);
	}

	function handleSelection(selectedValue: {
		id: number;
		name: string;
		path?: string;
	}) {
		if (selectedValue.name === "None") {
			ctxSetState(null);
			return;
		}

		if (selectedValue) {
			// setSelected({ ...selectedValue, name: selectedValue.name.toLowerCase() });
			ctxSetState(selectedValue);
		}
	}

	function handleBlur() {
		setShow(false);
	}

	return (
		<div
			onClick={handleShow}
			onBlur={handleBlur}
			className="relative h-[38.6px] w-full rounded border bg-white md:w-56"
		>
			<button
				id="menu-button"
				aria-expanded="true"
				aria-haspopup="true"
				type="button"
				className="flex h-full w-full items-center rounded focus:outline focus:outline-2 focus:outline-black"
			>
				<span className="block h-full w-full py-2 px-3 text-left leading-none">
					{selected ? (
						<div className="flex items-center">
							<div className="mr-3">
								{selected.path ? (
									<Image
										src={selected.path}
										width="0"
										height="0"
										className="h-5 w-5"
										alt=""
									/>
								) : (
									<NoSymbolIcon className="h-5 w-5 " />
								)}
							</div>
							<span>{selected.name}</span>
						</div>
					) : (
						<span className="text-slate-400">{placeholder}</span>
					)}
				</span>
				<span className="absolute right-3 block">
					<ChevronUpDownIcon className="h-6 w-6 text-gray-500" />
				</span>
			</button>

			<ul
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				className={`absolute z-10 top-[calc(100%+1rem)] max-h-44 overflow-auto shadow w-full bg-inherit rounded px-0 mx-0 border border-black list-none
          ${show ? "block" : "hidden"}`}
			>
				{Object.hasOwn(options, "de") ? (
					<li className="mb-2 border-b px-2 py-1 font-bold">
						Desktop Environment
					</li>
				) : null}
				{Object.hasOwn(options, "de")
					? options.de.map(
						(option: { id: number; name: string; path?: string }) => (
							<li
								role="menuitem"
								className={`flex items-center hover:text-white hover:bg-black hover:cursor-pointer px-2 py-1 ${option.name === selected?.name
									? "bg-black text-white"
									: null
									}`}
								onMouseDown={() => handleSelection(option)}
								key={option.id}
							>
								<div tabIndex={0} className="mr-3">
									{option.id === 0 ? (
										<NoSymbolIcon className="h-5 w-5" />
									) : (
										<Image
											src={`${option.path}`}
											width="0"
											height="0"
											className="h-5 w-5"
											alt="some image"
										/>
									)}
								</div>
								{option.name}
							</li>
						)
					)
					: options.map(
						(option: { id: number; name: string; path: string }) => (
							<li
								role="menuitem"
								className={`flex items-center hover:text-white hover:bg-black hover:cursor-pointer px-2 py-1 ${option.name === selected?.name
									? "bg-black text-white"
									: null
									}`}
								onMouseDown={() => handleSelection(option)}
								key={option.id}
							>
								<div tabIndex={0} className="mr-3">
									{option.id === 0 ? (
										<NoSymbolIcon className="h-5 w-5" />
									) : (
										<Image
											src={`${option?.path}`}
											width="0"
											height="0"
											className="h-5 w-5"
											alt="some image"
										/>
									)}
								</div>
								{option.name}
							</li>
						)
					)}
				{Object.hasOwn(options, "wm") ? (
					<div className="my-2 border px-2 py-1 font-bold">Window Menager</div>
				) : null}
				{Object.hasOwn(options, "wm")
					? options.wm.map(
						(option: { id: number; name: string; path: string }) => (
							<li
								role="menuitem"
								className={`flex items-center hover:text-white hover:bg-black hover:cursor-pointer px-2 py-1 ${option.name === selected?.name
									? "bg-black text-white"
									: null
									}`}
								onMouseDown={() => handleSelection(option)}
								key={option.id}
							>
								<div tabIndex={0} className="mr-3">
									{option.path !== "undefined" ? (
										<Image
											src={`${option.path}`}
											width="0"
											height="0"
											className="h-5 w-5"
											alt="some image"
										/>
									) : (
										<NoSymbolIcon className="h-5 w-5" />
									)}
								</div>
								{option.name}
							</li>
						)
					)
					: null}
			</ul>
		</div>
	);
}
