import { z } from "zod";

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);
const optionalUrl = z.preprocess(emptyToUndefined, z.string().url().optional());
const optionalSecret = z.preprocess(emptyToUndefined, z.string().min(1).optional());

export const publicEnvSchema = z.object({
  NEXT_PUBLIC_TELEGRAM_BOT_USERNAME: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .regex(/^[a-z][a-z0-9_]{3,29}bot$/i, "Invalid Telegram bot username")
      .optional(),
  ),
});

export const serverEnvSchema = publicEnvSchema.extend({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  TELEGRAM_BOT_TOKEN: optionalSecret,
  DATABASE_URL: optionalUrl,
  REDIS_URL: optionalUrl,
  S3_ENDPOINT: optionalUrl,
  S3_REGION: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  S3_BUCKET: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  S3_ACCESS_KEY_ID: optionalSecret,
  S3_SECRET_ACCESS_KEY: optionalSecret,
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
