/*
  Warnings:

  - You are about to drop the `Hero` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Hero";

-- CreateTable
CREATE TABLE "FavoriteHero" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "FavoriteHero_pkey" PRIMARY KEY ("id")
);
