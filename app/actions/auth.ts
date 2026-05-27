"use server";

import { verifyMessage } from "viem";
import { setServerSession, clearServerSession } from "@/lib/auth";

// TODO: store in DB later
const SIGN_MESSAGE_TITLE = "Sign in to Celestium";
const nonceStore = new Map<string, string>();

export async function getNonce(address: string) {
  const crypto = await import("crypto");
  const nonce = crypto.randomBytes(16).toString("hex");
  nonceStore.set(normalizeAddress(address), nonce);
  return nonce;
}

type LoginPayload = {
  address: string;
  signature: string;
};

export async function loginWallet({ address, signature }: LoginPayload) {
  const normalizedAddress = normalizeAddress(address);
  const nonce = nonceStore.get(normalizedAddress);
  if (!nonce) throw new Error("Missing nonce – call getNonce first");

  try {
    const message = buildSignatureMessage(nonce);

    const isValid = await verifyMessage({
      address: address as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    });

    if (!isValid) throw new Error("Signature verification failed");

    await setServerSession(address as `0x${string}`);
    return { success: true };
  } finally {
    nonceStore.delete(normalizedAddress);
  }
}

export async function logout() {
  await clearServerSession();
  return { success: true };
}

function normalizeAddress(address: string) {
  const normalized = address?.trim().toLowerCase();
  if (!normalized) throw new Error("Wallet address is required");
  return normalized;
}

function buildSignatureMessage(nonce: string) {
  return `${SIGN_MESSAGE_TITLE}\n\nNonce: ${nonce}`;
}
