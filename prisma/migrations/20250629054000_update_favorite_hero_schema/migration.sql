/*
  Warnings:

  - Made the column `description` on table `FavoriteHero` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thumbnail` on table `FavoriteHero` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FavoriteHero" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "thumbnail" SET NOT NULL;
