// import { ConvertToBase64 } from "@/helpers/convertToBase64";
import multiFiles from "@/helpers/multiFiles"
import de_list from "@/static/de_list.json"
import { DocumentPlusIcon, XMarkIcon } from "@heroicons/react/20/solid"
// @ts-ignore
import { CldImage } from "next-cloudinary"
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
	value: string
	label: string
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

export default function DistroForm({ handleOpen, setOpen, open }: any) {
	const [newDistro, setNewDistro] = useState({
		name: "",
		about: "",
		website: "",
		downloadLink: "",
		logo: "",
		basedOn: "",
		waitingDistro: true,
	})

	const [_files, setFiles] = useState([])
	const [_deskEnv, setDeskEnv] = useState<Option[]>([])
	const router = useRouter()

	function handleMultiSelect(
		option: readonly Option[],
		_actionMeta: ActionMeta<Option>
	) {
		setDeskEnv([...option])
	}
	//combine lists into one array
	const options = [...de_list.de, ...de_list.wm].map(({ name }) => {
		return { value: name.toLowerCase(), label: name }
	})
	options.shift() // return arr without none value

	function handleChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target
		setNewDistro((): any => {
			return {
				...newDistro,
				[name]: value,
			}
		})
	}

	async function handleLogo(e: FormEvent<HTMLInputElement>) {
		const url = "https://api.cloudinary.com/v1_1/db1fkstfm/image/upload"
		const logo = (e.target as HTMLInputElement)?.files![0]

		const body = new FormData()
		body.append("file", logo, logo.name)
		body.append("upload_preset", "distro_logos")

		const config = {
			method: "POST",
			body,
		}

		try {
			const response = await fetch(url, config)
			const { public_id } = await response.json()
			setNewDistro({
				...newDistro,
				logo: public_id,
			})
		} catch (error) {
			console.error(error)
		}
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setOpen(false)
		const body = { ...newDistro, de: _deskEnv, images: _files }

		try {
			const res = await fetch(`/api/v1/waitingList`, {
				method: "POST",
				body: JSON.stringify(body),
			})
			router.replace(router.asPath)
			return res.status
		} catch (error) {
			console.error(error)
		}
	}

	async function handleFiles(files: FileList) {
		const data: any[] = []
		for (const file of Array.from(files)) {
			console.log(file)
			await multiFiles(file)
				.then((d) => data.push({ value: d.public_id }))
				.finally(() => {
					setFiles([..._files, ...data] as any)
				})
		}
	}

	return (
		<Dialog
			className="h-11/12 top-12 w-11/12 max-w-3xl rounded border bg-white shadow md:top-auto"
			onClick={(e) => e.stopPropagation()}
			open={open}>
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
				onSubmit={handleSubmit}
				className="mt-4 flex flex-col gap-4">
				<div className="flex flex-col gap-4 md:flex-row">
					<Input
						autoFocus
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
							name="de"
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
					<div className="flex h-16 w-full items-end gap-4">
						{!newDistro.logo ? (
							<Image
								src="/placeholder_img.svg"
								alt="Logo"
								width={0}
								height={0}
								className="aspect-square w-16"
							/>
						) : (
							<CldImage
								className="aspect-square w-16"
								width={0}
								height={0}
								src={newDistro.logo}
								alt="Logo"
							/>
						)}
						<InputFile
							name="logo"
							label="Upload"
							onChange={handleLogo}
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
						name="about"
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
						onChange={(e) => handleFiles(e.target.files as any)}
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
	)
}
