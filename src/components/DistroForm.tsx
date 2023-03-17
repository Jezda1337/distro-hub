// import { ConvertToBase64 } from "@/helpers/convertToBase64";
import type { DistroForm } from "@/interfaces/distroInput.interfaces"
import de_list from "@/static/de_list.json"
import { DocumentPlusIcon, XMarkIcon } from "@heroicons/react/20/solid"
import Image from "next/image"
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useState } from "react"
import Select, { ActionMeta } from "react-select"
import makeAnimated from "react-select/animated"
import { Button } from "./ui/Button"
import { Dialog } from "./ui/Dialog"
import { Input } from "./ui/Input"
import { InputFile } from "./ui/InputFile"

const animatedComponents = makeAnimated()

interface Option {
	id: number
	value: string
	label: string
}

interface Props {
	handleOpen(): void
	setOpen(open: boolean): void
	open: boolean
}

const reactSelectCustomStyle = {
	option: (baseStyles: any, state: any) => ({
		...baseStyles,
		color: state.isFocused ? "white" : "black",
	}),
	control: (baseStyles: any) => ({
		...baseStyles,
		border: baseStyles.border,
	}),
	valueContainer: (baseStyles: any) => ({
		...baseStyles,
	}),
}

export default function DistroForm({ handleOpen, open, setOpen }: Props) {
	const [newDistro, setNewDistro] = useState<DistroForm>({
		name: "",
		website: "",
		description: "",
		logo: "",
		basedOn: "",
		desktopEnvironments: [],
		downloadLink: "",
		distroScreenShoots: [],
	})

	const [_deskEnv, setDeskEnv] = useState<Option[]>([])

	function handleMultiSelect(
		option: readonly Option[],
		_actionMeta: ActionMeta<Option>
	) {
		setDeskEnv([...option])
	}
	const router = useRouter()
	const options = [...de_list.de, ...de_list.wm].map(({ name, id }) => {
		return { id: id, value: name, label: name }
	})
	options.shift() // return arr without none value

	function handleChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const target = event.target
		setNewDistro({
			...newDistro,
			[target.name]: target.value,
		})
	}

	function handleFiles(e: React.ChangeEvent) {
		const target = (e.target as HTMLInputElement).files
		setNewDistro({
			...newDistro,
			distroScreenShoots: [...newDistro.distroScreenShoots, ..._deskEnv],
			...target,
		})
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setOpen(false)

		const formData = new FormData(event.currentTarget)
		const payload = Object.fromEntries(formData)
		setNewDistro({
			...newDistro,
			desktopEnvironments: [...newDistro.desktopEnvironments, ..._deskEnv],
			...payload,
		})
		console.log(newDistro)

		try {
			const res = await fetch(`/api/v1/waitingList`, {
				method: "POST",
				body: JSON.stringify(newDistro),
			})
			router.replace(router.asPath)
			return res.status
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div
			className={`${open ? "grid" : "hidden"
				} absolute z-10 backdrop-blur-sm inset-0 place-items-center`}
			onClick={handleOpen}>
			<Dialog
				onClick={(e) => e.stopPropagation()}
				open={open}
				className="h-11/12 w-11/12 max-w-3xl rounded border bg-white shadow">
				<header className="mb-3 flex items-start justify-between border-b pb-3">
					<div>
						<p className="text-lg font-medium">Submit distro</p>
						<p className="text-sm text-slate-500">Please fill in the fields.</p>
					</div>
					<Button onClick={handleOpen}>
						<XMarkIcon className="h-5 w-5" />
					</Button>
				</header>
				<form
					method="POST"
					onSubmit={handleSubmit}
					className="mt-4 flex flex-col gap-4">
					<div className="flex flex-col gap-4 md:flex-row">
						<Input
							type="text"
							name="name"
							onChange={handleChange}
							placeholder="Ex. Ubuntu"
							label="Disto name"
						/>
						<div className="w-full">
							<label className="mb-1 inline-block text-base">
								Desktop environments
							</label>
							<Select
								placeholder="Ex. Gnome"
								className=" w-full self-end"
								styles={reactSelectCustomStyle}
								closeMenuOnSelect={false}
								onChange={handleMultiSelect}
								components={animatedComponents}
								isMulti
								options={options}
								theme={(theme) => ({
									...theme,
									borderRadius: 4,
									colors: {
										...theme.colors,
										primary25: "black",
										primary: "black",
										neutral90: "white",
									},
								})}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-4 md:flex-row">
						<Input
							type="text"
							name="website"
							onChange={handleChange}
							placeholder="ubuntu.org"
							label="Website"
						/>
						<Input
							type="text"
							name="downloadLink"
							onChange={handleChange}
							prefixText={true}
							className="rounded-l-none"
							placeholder="www.example.com"
							label="Download link/page"
						/>
					</div>
					<div className="flex flex-col gap-4 md:flex-row md:items-center">
						<div className="gal-4 flex w-full items-end">
							<Image
								src={newDistro.logo ? newDistro.logo : "/images/arch.svg"}
								alt="Logo"
								width={0}
								height={0}
								className="aspect-square w-16"
							/>
							<InputFile
								name="logo"
								label="Upload"
								onChange={handleChange}
								className="w-full"
							/>
						</div>
						<Input
							type="text"
							name="basedOn"
							onChange={handleChange}
							label="Based on"
							placeholder="Ex. Debian"
						/>
					</div>
					<div>
						<label className="mb-1 inline-block text-base">About</label>
						<textarea
							onChange={handleChange}
							className="h-32 w-full rounded border px-3 py-2 focus-within:outline-none focus:border-[2px] focus:border-black focus:outline-none"
							name="description"
							required={true}
							placeholder="Brief description od distro"
						/>
						<span className="text-sm text-slate-500">
							Brief description of distribution.
						</span>
					</div>
					<div>
						<span className="mb-1 inline-block">Distro screenshots</span>
						<label
							htmlFor="screenShoots"
							className="group flex h-32 w-full flex-col place-items-center justify-center rounded border border-dashed md:hover:cursor-pointer md:hover:border-solid md:hover:transition-all">
							<DocumentPlusIcon className="transition-hover relative aspect-square w-8 group-hover:scale-125" />
							<span className="text-blue-500">Upload files</span>
							<span className="text-slate-500">PNG, JPG, WEBP</span>
						</label>
						<input
							type="file"
							// name="distroScreenShoots"
							onChange={handleFiles}
							accept=".png, .jpg, .jpge, .webp"
							multiple
							className="hidden"
							id="screenShoots"
						/>
					</div>
					<div className="self-end">
						<Button>Submit</Button>
					</div>
				</form>
			</Dialog>
		</div>
	)
}
