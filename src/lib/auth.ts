import { jwtVerify, SignJWT } from "jose";
import { nanoid } from "nanoid";
import { NextApiResponse } from "next";
import { getJwtSecretKey, USER_TOKEN } from "./constants";
import { serialize } from "cookie";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export async function verifyAuth(token: string) {
  if (!token) throw new Error("Token is trash");
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload as UserJwtPayload;
  } catch (error) {
    throw new Error("");
  }
}

export async function setUserCookie(res: NextApiResponse, expTime: number) {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(getJwtSecretKey()));

  res.setHeader(
    "Set-Cookie",
    serialize(USER_TOKEN, token, {
      httpOnly: true,
      path: "/",
      secure: true,
      maxAge: expTime,
    })
  );
  return res.status(200).json({ message: "Success!" });
}
