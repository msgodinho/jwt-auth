import type { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../../models/User";
import bcrypt from "bcryptjs";
import { usersRequestSchema } from "../../schemas/userRegister";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, email, password, confirmPassword } = usersRequestSchema.parse(
      request.body
    );

    if (password !== confirmPassword) {
      return reply
        .status(422)
        .send("Password must be equal to confirmed password!");
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return reply.status(422).send("This email already exists!");
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    await user.save();

    return reply.status(201).send("User created!");
  } catch (error) {
    return reply
      .status(409)
      .send({ message: "An error occurred during registration." });
  }
}
