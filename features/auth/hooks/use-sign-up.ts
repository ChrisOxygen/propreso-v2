"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ZSignUpSchema, type ZSignUp } from "@/features/auth/schemas/auth-schemas";
import { createClient } from "@/shared/lib/supabase/client";

export function useSignUp() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ZSignUp>({
    resolver: zodResolver(ZSignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: undefined,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsPending(true);
    setError(null);

    const supabase = createClient();

    const { error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          full_name: `${data.firstName} ${data.lastName}`,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setIsPending(false);
      return;
    }

    router.push("/dashboard");
  });

  const signUpWithGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return { form, onSubmit, isPending, error, signUpWithGoogle };
}
