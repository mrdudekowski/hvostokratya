"use client";

import { usePlatformMode } from "@/platform/telegram/telegram-provider";

const modeLabels = {
  checking: "Проверяем среду запуска",
  browser: "Безопасный просмотр в браузере",
  telegram: "Приложение открыто в Telegram",
} as const;

export function PlatformEntry({
  telegramBotUsername,
}: Readonly<{ telegramBotUsername?: string }>) {
  const mode = usePlatformMode();
  const botUrl = telegramBotUsername ? `https://t.me/${telegramBotUsername}` : null;

  return (
    <div className="platform-entry">
      <p aria-live="polite" className="platform-status">
        {modeLabels[mode]}
      </p>
      {mode === "browser" && botUrl ? (
        <a className="primary-button" href={botUrl} rel="noreferrer">
          Открыть в Telegram
        </a>
      ) : null}
      {mode === "browser" && !botUrl ? (
        <p className="platform-hint">
          Запуск через Telegram станет доступен после подключения официального бота.
        </p>
      ) : null}
    </div>
  );
}
