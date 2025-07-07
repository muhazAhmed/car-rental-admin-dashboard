-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "pricePerDay" REAL NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
