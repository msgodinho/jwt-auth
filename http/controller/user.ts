import type { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../../models/User";

interface IParams {
  id: string;
}

export async function getUserById(
  request: FastifyRequest<{ Params: IParams }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    console.log(id);
    const user = await User.findById(id, "-password");

    if (!user) {
      return reply.status(404).send({ message: "User not found." });
    }

    return reply.status(200).send(user);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "An internal error occurred." });
  }
}
