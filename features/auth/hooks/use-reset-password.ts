"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ZResetPasswordSchema, type ZResetPassword } from "@/features/auth/schemas/auth-schemas";
import { createClient } from "@/shared/lib/supabase/client";

export function useResetPassword() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ZResetPassword>({
    resolver: zodResolver(ZResetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsPending(true);
    setError(null);

    const supabase = createClient();

    const { error: authError } = await supabase.auth.updateUser({
      password: data.password,
    });

    setIsPending(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    router.push("/dashboard");
  });

  return { form, onSubmit, isPending, error };
}
