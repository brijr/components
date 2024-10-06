"use server";

import { FormValues } from "@/app/contact/page";

export async function submitForm(data: FormValues) {
  try {
    const response = await fetch(
      "https://app.router.so/api/endpoints/ep1ucab6",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer c517f1cc5014d7d6402be11cc3c689ea8f719ac7bb64f3ed04625770017c67a4",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    return { success: true };
  } catch (error) {
    console.error("An error occurred:", error);
    return { success: false, error: "Form submission failed" };
  }
}
