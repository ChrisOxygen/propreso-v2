"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZForgotPasswordSchema, type ZForgotPassword } from "@/features/auth/schemas/auth-schemas";
import { createClient } from "@/shared/lib/supabase/client";

export function useForgotPassword() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const form = useForm<ZForgotPassword>({
    resolver: zodResolver(ZForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsPending(true);
    setError(null);

    const supabase = createClient();

    const { error: authError } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password&type=recovery`,
    });

    setIsPending(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    setSent(true);
  });

  return { form, onSubmit, isPending, error, sent };
}
