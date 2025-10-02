import { z } from "zod";

export const usersRequestSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});
