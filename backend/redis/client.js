import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT)
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

export const connectToRedis = async () => {
  await redisClient.connect();
}