export const USER_TOKEN = "DistroHub-token"

// const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY!;
const JWT_SECRET_KEY = "secret"

export function getJwtSecretKey() {
	if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
		throw new Error("The environment variable JWT_SECRET_KEY is not set.")
	}

	return JWT_SECRET_KEY
}
