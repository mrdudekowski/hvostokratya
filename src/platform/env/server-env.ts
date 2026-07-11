import "server-only";
import { serverEnvSchema } from "@/platform/env/env-schema";

export type PublicConfig = Readonly<{
  telegramBotUsername?: string;
}>;

export function getServerEnv() {
  return serverEnvSchema.parse(process.env);
}

export function getPublicConfig(): PublicConfig {
  const env = getServerEnv();

  return env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME
    ? { telegramBotUsername: env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME }
    : {};
}
