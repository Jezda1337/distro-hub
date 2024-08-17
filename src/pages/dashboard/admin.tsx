import { Input } from "@/components/ui/Input"
import Head from "next/head"
import { FormEvent, useState } from "react"

export default function Admin() {
	const [data, setData] = useState<any>([])
	const [distroName, setDistroName] = useState("")

	async function getWaitingDistro(e: FormEvent) {
		e.preventDefault()
		try {
			const response = await fetch("/api/v1/waitingList/" + distroName)
			const json = await response.json()
			setData(json)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<Head>
				<title>DistroHub - Admin</title>
			</Head>
			<form onSubmit={getWaitingDistro}>
				<Input onChange={(e) => setDistroName(e.target.value)} />
				<button type="submit">submit</button>
			</form>

			{data?.map((distro: any) => (
				<h1 key={distro.id}>{distro.name}</h1>
			))}
		</>
	)
}

Admin.getLayout = function PageLayout(page: JSX.Element) {
	return <>{page}</>
}
