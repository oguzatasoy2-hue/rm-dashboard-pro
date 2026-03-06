"use server";

import { login as loginAuth, logout as logoutAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
    const result = await loginAuth(formData);

    if (result.success) {
        return { success: true };
    }

    return { success: false, error: result.error };
}

export async function logoutAction() {
    await logoutAuth();
    redirect("/login");
}
