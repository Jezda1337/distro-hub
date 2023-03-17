import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import Head from "next/head"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"

export default function Login() {
	const [userName, setUserName] = useState("")
	const [password, setPassword] = useState("")
	const router = useRouter()

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (userName === "" || userName.length === 0) {
			throw new Error("Username is required.")
		}
		if (password === "" || password.length < 6) {
			throw new Error("Password is required.")
		}

		const credentials = { userName: userName, password: password }

		const admin = await fetch(`/api/v1/auth/login`, {
			method: "POST",
			body: JSON.stringify(credentials),
		})
		const adminMessage = await admin.json()
		console.log(adminMessage)
		router.push("/dashboard/admin")
	}
	return (
		<>
			<Head>
				<title>DistroHub - Login</title>
			</Head>

			<form
				className="mx-auto mt-[300px] max-w-md"
				onSubmit={handleSubmit}>
				<div className="flex flex-col gap-4">
					<div>
						<label
							htmlFor="userName"
							className="mb-2">
							Username:
						</label>
						<Input
							id="userName"
							autoFocus
							onChange={(e) => setUserName(e.target.value)}
							className="mx-0"
							placeholder="username"
							type="text"
							name="userName"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="mb-2">
							Password:
						</label>
						<Input
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							className="mx-0"
							placeholder="password"
							type="password"
							name="password"
						/>
					</div>
				</div>

				<Button
					className="ml-auto mt-4 block"
					type="submit">
					Login
				</Button>
			</form>
		</>
	)
}
