export type TelegramThemeParams = Readonly<{
  bg_color?: string;
  secondary_bg_color?: string;
  text_color?: string;
  hint_color?: string;
  button_color?: string;
  button_text_color?: string;
  destructive_text_color?: string;
}>;

export type TelegramEvent = "themeChanged";

export interface TelegramWebApp {
  readonly initData?: string;
  readonly themeParams?: TelegramThemeParams;
  ready(): void;
  expand(): void;
  onEvent?(event: TelegramEvent, listener: () => void): void;
  offEvent?(event: TelegramEvent, listener: () => void): void;
}

export type TelegramWindow = Window & {
  Telegram?: {
    WebApp?: TelegramWebApp;
  };
};

const themeTokenMap = {
  bg_color: "--color-bg",
  secondary_bg_color: "--color-surface",
  text_color: "--color-text",
  hint_color: "--color-text-muted",
  button_color: "--color-primary",
  button_text_color: "--color-primary-contrast",
  destructive_text_color: "--color-danger",
} as const satisfies Record<keyof TelegramThemeParams, string>;

export function getTelegramWebApp(source: TelegramWindow | undefined): TelegramWebApp | null {
  const webApp = source?.Telegram?.WebApp;

  return webApp && typeof webApp.ready === "function" && typeof webApp.expand === "function"
    ? webApp
    : null;
}

export function getThemeTokens(theme: TelegramThemeParams | undefined) {
  const tokens: Record<string, string> = {};

  if (!theme) {
    return tokens;
  }

  for (const key of Object.keys(themeTokenMap) as (keyof TelegramThemeParams)[]) {
    const value = theme[key];

    if (value) {
      tokens[themeTokenMap[key]] = value;
    }
  }

  return tokens;
}

export function attachTelegramWebApp(webApp: TelegramWebApp, root: HTMLElement) {
  const previousTokens = new Map<string, string>();
  const colorProbe = root.ownerDocument.createElement("span").style;

  const applyTheme = () => {
    for (const [token, value] of Object.entries(getThemeTokens(webApp.themeParams))) {
      if (!previousTokens.has(token)) {
        previousTokens.set(token, root.style.getPropertyValue(token));
      }

      colorProbe.color = "";
      colorProbe.color = value;

      if (colorProbe.color) {
        root.style.setProperty(token, value);
      }
    }
  };

  root.dataset.telegramMode = "telegram";
  applyTheme();
  webApp.onEvent?.("themeChanged", applyTheme);
  webApp.ready();
  webApp.expand();

  return () => {
    webApp.offEvent?.("themeChanged", applyTheme);

    for (const [token, value] of previousTokens) {
      if (value) {
        root.style.setProperty(token, value);
      } else {
        root.style.removeProperty(token);
      }
    }

    delete root.dataset.telegramMode;
  };
}
