import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = process.env.AUTH_SECRET || "fallback_secret_for_dev_only";
const key = new TextEncoder().encode(SECRET_KEY);

export async function encrypt(payload: Record<string, unknown>) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function decrypt(input: string): Promise<Record<string, unknown>> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload as Record<string, unknown>;
}

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Realistic Demo Check
    if (email === "admin@ormpro.com" && password === "ORMpro_Secure_2026") {
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
        const session = await encrypt({
            user: { email, role: "admin" },
            expires: expires.getTime()
        });

        const cookieStore = await cookies();
        cookieStore.set("rm_pro_session", session, {
            expires,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        return { success: true };
    }

    return { success: false, error: "Invalid credentials" };
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.set("rm_pro_session", "", { expires: new Date(0), path: "/" });
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("rm_pro_session")?.value;
    if (!session) return null;
    try {
        return await decrypt(session);
    } catch {
        return null;
    }
}
