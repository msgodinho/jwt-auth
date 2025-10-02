import type { FastifyReply, FastifyRequest } from "fastify";

export async function home(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({ msg: "Welcome!" });
}
