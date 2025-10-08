import type { FastifyInstance } from "fastify";

import { register } from "./controller/register.ts";
import { home } from "./controller/home.ts";
import { login } from "./controller/login.ts";
import { getUserById } from "./controller/userById.ts";
import { checkToken } from "../services/checkToken.ts";

export async function appRoutes(app: FastifyInstance) {
  app.get("/", home);
  app.post("/users/register", register);
  app.post("/users/login", login);
  app.get(
    "/users/:id",
    {
      preHandler: [checkToken], // Hook de preHandler executa antes do handler principal
    },
    getUserById
  );
}
