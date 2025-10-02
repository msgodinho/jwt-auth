import z from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["prod", "dev", "test"]),
  PORT: z.coerce.number().default(3000),
  MONGODB_USER: z.string(),
  MONGODB_PASSWORD: z.string(),
  SECRET_HASH: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    "Invalid environment variables!",
    JSON.stringify(_env.error.issues, null, 2)
  );
  process.exit(1);
}

export const env = _env.data;
