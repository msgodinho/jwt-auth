import type { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";
import { env } from "../env";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export async function checkToken(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply
      .status(401)
      .send({ message: "Unauthorized: Token not provided." });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return reply
      .status(401)
      .send({ message: "Unauthorized: Token malformatted." });
  }

  const token = parts[1];

  try {
    const decoded = verify(token, env.SECRET_HASH);
    const { id } = decoded as TokenPayload;

    // A better long-term solution is to use module augmentation
    // to add `user` to the FastifyRequest interface.
    (request as any).user = { id };
    
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized: Invalid token." });
  }
}
