import { PrismaClient } from "@prisma/client";

//nextJsのホットリロードにより複数インスタンスが作成され、メモリリークを防ぐ
//https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
