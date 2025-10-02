import type { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../../models/User";
import bcrypt from "bcryptjs";
import { usersRequestSchema } from "../../schemas/userLogin";
import { env } from "../../env";
import jwt from "jsonwebtoken";

export async function login(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password } = usersRequestSchema.parse(request.body);

    const user = await User.findOne({ email: email });

    if (!user) {
      return reply.status(404).send({ message: "User not found." });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return reply.status(401).send({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, env.SECRET_HASH, {
      expiresIn: "7d",
    });

    return reply.status(200).send({ token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return reply.status(500).send({ message: "An internal error occurred." });
  }
}
