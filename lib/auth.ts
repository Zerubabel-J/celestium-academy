import { cookies } from "next/headers";
import { signJwt, verifyJwt } from "./jwt";

export type AuthSession = {
  address: `0x${string}`;
};

const SESSION_COOKIE = "celestium_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export async function getServerUser(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const payload = verifyJwt<AuthSession>(token);
  if (!payload?.address) return null;
  return { address: payload.address };
}

export async function setServerSession(address: `0x${string}`) {
  const token = signJwt({ address }, { expiresInSeconds: SESSION_TTL_SECONDS });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: resolveCookieSecurityFlag(),
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearServerSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

function resolveCookieSecurityFlag() {
  return process.env.NODE_ENV === "production";
}
