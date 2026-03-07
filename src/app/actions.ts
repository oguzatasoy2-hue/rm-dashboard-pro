"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    (await cookies()).delete("rm_pro_session");
    redirect("/login");
}

export async function saveConfig(_prevState: unknown, formData: FormData) {
    // Simulate server-side processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, you would save to a database here
    const data = Object.fromEntries(formData.entries());
    console.log("Saving config:", data);

    return { success: true };
}
