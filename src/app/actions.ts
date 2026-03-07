"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.set("rm_pro_session", "", { expires: new Date(0), path: "/" });
    redirect("/login");
}

export async function saveConfig(_prevState: unknown, formData: FormData) {
    // Simulate server-side processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // In a real app (Phase 2), we would save to PostgreSQL here
    const data = Object.fromEntries(formData.entries());
    console.log("Saving config:", data);

    return { success: true, timestamp: Date.now() };
}
