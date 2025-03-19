/*
  Warnings:

  - You are about to drop the `Personagem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Personagem";

-- CreateTable
CREATE TABLE "PERSONAGEM" (
    "id_personagem" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "casa" TEXT NOT NULL,

    CONSTRAINT "PERSONAGEM_pkey" PRIMARY KEY ("id_personagem")
);
