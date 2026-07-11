"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlatformMode } from "@/platform/telegram/telegram-provider";
import {
  getTelegramWebApp,
  type TelegramWindow,
} from "@/platform/telegram/telegram-web-app";

type AuthState = "idle" | "authenticating" | "error";

export function TelegramAuthBootstrap() {
  const mode = usePlatformMode();
  const router = useRouter();
  const [state, setState] = useState<AuthState>("idle");

  useEffect(() => {
    if (mode !== "telegram") {
      return;
    }

    const controller = new AbortController();

    async function authenticate() {
      const webApp = getTelegramWebApp(window as TelegramWindow);

      if (!webApp?.initData) {
        setState("error");
        return;
      }

      setState("authenticating");

      try {
        const response = await fetch("/api/v1/auth/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ initData: webApp.initData }),
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          setState("error");
          return;
        }

        const body = (await response.json()) as { next?: string };
        router.replace(body.next === "/profile" ? "/feed/nearby" : "/onboarding");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setState("error");
      }
    }

    void authenticate();

    return () => controller.abort();
  }, [mode, router]);

  if (state === "authenticating") {
    return <p className="platform-hint">Подтверждаем безопасный вход…</p>;
  }

  if (state === "error") {
    return (
      <p className="form-message form-message-error" role="alert">
        Не удалось подтвердить запуск. Закройте Mini App и откройте его снова из официального бота.
      </p>
    );
  }

  return null;
}
