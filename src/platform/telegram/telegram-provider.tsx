"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  attachTelegramWebApp,
  getTelegramWebApp,
  type TelegramWebApp,
  type TelegramWindow,
} from "@/platform/telegram/telegram-web-app";

type PlatformMode = "checking" | "browser" | "telegram";

const TelegramContext = createContext<PlatformMode>("checking");

function getClientMode(): PlatformMode {
  const mode = document.documentElement.dataset.telegramMode;

  return mode === "telegram" || mode === "browser" ? mode : "checking";
}

function getServerMode(): PlatformMode {
  return "checking";
}

export function TelegramProvider({
  children,
  webApp,
}: Readonly<{ children: ReactNode; webApp?: TelegramWebApp | null }>) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const resolvedWebApp =
        webApp === undefined ? getTelegramWebApp(window as TelegramWindow) : webApp;

      if (!resolvedWebApp) {
        document.documentElement.dataset.telegramMode = "browser";
        onStoreChange();

        return () => {
          delete document.documentElement.dataset.telegramMode;
        };
      }

      const detach = attachTelegramWebApp(resolvedWebApp, document.documentElement);
      onStoreChange();

      return detach;
    },
    [webApp],
  );
  const mode = useSyncExternalStore(subscribe, getClientMode, getServerMode);

  return <TelegramContext.Provider value={mode}>{children}</TelegramContext.Provider>;
}

export function usePlatformMode() {
  return useContext(TelegramContext);
}
