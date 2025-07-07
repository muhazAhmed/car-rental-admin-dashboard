const Prisma = require("@prisma/client").PrismaClient;

const globalForPrisma = globalThis as unknown as {
    prisma: InstanceType<typeof Prisma> | undefined;
};

export const prisma = globalForPrisma.prisma ?? new Prisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
