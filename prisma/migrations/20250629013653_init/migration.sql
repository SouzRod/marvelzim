-- CreateTable
CREATE TABLE "Hero" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);
