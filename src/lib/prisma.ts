/* eslint-disable @typescript-eslint/no-require-imports */
// Prisma v7 client singleton for Next.js
// Using require() for compatibility with Prisma v7's generated output

function makePrismaClient() {
  // Dynamic require avoids TS import resolution issues with Prisma v7
  const { PrismaClient } = require('@prisma/client');
  return new PrismaClient();
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof makePrismaClient> | undefined;
};

const prisma = globalForPrisma.prisma ?? makePrismaClient();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
