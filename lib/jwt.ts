import crypto from "crypto";

type JWTPayload = Record<string, unknown> & {
  exp?: number;
  iat?: number;
};

const ALG = "HS256";

export function signJwt(
  payload: JWTPayload,
  opts?: { expiresInSeconds?: number }
): string {
  const secret = getSecret();

  const header = { alg: ALG, typ: "JWT" };
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = opts?.expiresInSeconds
    ? issuedAt + opts.expiresInSeconds
    : undefined;

  const body = {
    ...payload,
    iat: issuedAt,
    ...(expiresAt ? { exp: expiresAt } : {}),
  };

  const headerB64 = toBase64Url(JSON.stringify(header));
  const payloadB64 = toBase64Url(JSON.stringify(body));
  const data = `${headerB64}.${payloadB64}`;

  const signature = crypto.createHmac("sha256", secret).update(data).digest();
  const signatureB64 = toBase64Url(signature);

  return `${data}.${signatureB64}`;
}

export function verifyJwt<T extends JWTPayload = JWTPayload>(
  token: string
): T | null {
  try {
    const secret = getSecret();
    const segments = token.split(".");
    if (segments.length !== 3) return null;

    const [headerSegment, payloadSegment, signatureSegment] = segments;
    const signingInput = `${headerSegment}.${payloadSegment}`;

    const headerJson = fromBase64Url(headerSegment).toString("utf8");
    const header = JSON.parse(headerJson) as { alg?: string };
    if (header.alg !== ALG) return null;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(signingInput)
      .digest();
    const receivedSignature = fromBase64Url(signatureSegment);

    if (receivedSignature.length !== expectedSignature.length) return null;
    if (!crypto.timingSafeEqual(receivedSignature, expectedSignature)) {
      return null;
    }

    const payloadJson = fromBase64Url(payloadSegment).toString("utf8");
    const payload = JSON.parse(payloadJson) as T;

    if (payload.exp && Date.now() / 1000 > payload.exp) return null;

    return payload;
  } catch {
    return null;
  }
}

function toBase64Url(input: Buffer | string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function fromBase64Url(input: string) {
  const remainder = input.length % 4;
  const padding = remainder === 0 ? 0 : 4 - remainder;
  const padded = `${input}${"=".repeat(padding)}`
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  return Buffer.from(padded, "base64");
}

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET not set");
  return secret;
}
