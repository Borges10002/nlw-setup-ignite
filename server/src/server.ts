import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors);

app.get("/hello", () => {
  const habits = prisma.habit.findMany();
  return habits;
});

const port = 3339;

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`HTTP Server running port ${port} ! `);
  });
