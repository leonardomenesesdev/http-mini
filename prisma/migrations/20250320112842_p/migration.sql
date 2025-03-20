/*
  Warnings:

  - You are about to drop the `PERSONAGEM` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PERSONAGEM";

-- CreateTable
CREATE TABLE "personagem" (
    "id_personagem" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "casa" TEXT NOT NULL,

    CONSTRAINT "personagem_pkey" PRIMARY KEY ("id_personagem")
);
