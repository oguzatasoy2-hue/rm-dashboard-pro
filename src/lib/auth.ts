import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.AUTH_SECRET || "fallback_secret_for_dev_only";

// Helper to sign a payload and get a token
async function sign(payload: string, secret: string) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(payload)
    );
    const hash = btoa(String.fromCharCode(...new Uint8Array(signature)));
    return `${btoa(payload)}.${hash}`;
}

// Helper to verify a token and get the payload
async function verify(token: string, secret: string) {
    try {
        const [b64Payload, hash] = token.split(".");
        const payload = atob(b64Payload);
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            "raw",
            encoder.encode(secret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["verify"]
        );
        const signature = new Uint8Array(
            atob(hash)
                .split("")
                .map((c) => c.charCodeAt(0))
        );
        const isValid = await crypto.subtle.verify(
            "HMAC",
            key,
            signature,
            encoder.encode(payload)
        );
        if (!isValid) return null;
        return JSON.parse(payload);
    } catch (e) {
        return null;
    }
}

export async function login(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    // Realistic Demo Check
    if (email === "admin@ormpro.com" && password === "ORMpro_Secure_2026") {
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
        const payload = JSON.stringify({
            user: { email, role: "admin" },
            expires: expires.getTime()
        });

        const session = await sign(payload, SECRET_KEY);

        const cookieStore = await cookies();
        cookieStore.set("rm_pro_session", session, {
            expires,
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/'
        });

        return { success: true };
    }

    return { success: false, error: "Invalid credentials" };
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.set("rm_pro_session", "", { expires: new Date(0), path: '/' });
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("rm_pro_session")?.value;
    if (!session) return null;
    return await verify(session, SECRET_KEY);
}

// For Middleware which needs to be super fast and handles NextResponse
export async function decrypt(token: string) {
    return await verify(token, SECRET_KEY);
}
