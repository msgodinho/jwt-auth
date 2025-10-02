import { app } from "./app";
import mongoose from "mongoose";
import { env } from "./env/index.ts";

const start = async () => {
  try {
    const mongoUri = `mongodb://${env.MONGODB_USER}:${env.MONGODB_PASSWORD}@localhost:27017/auth-tutorial?authSource=admin`;

    // Conecta ao MongoDB
    await mongoose.connect(mongoUri);
    console.log("Conectado ao MongoDB com sucesso!");

    // Inicia o servidor Fastify
    const address = await app.listen({ port: env.PORT, host: "0.0.0.0" });
    console.log(`Servidor rodando em ${address}`);
  } catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
};

start();
