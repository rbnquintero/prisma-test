/*
  Warnings:

  - You are about to drop the column `password` on the `SPXGuest` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `SPXHost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SPXGuest" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "SPXHost" DROP COLUMN "password";

-- CreateTable
CREATE TABLE "SPXUser" (
    "username" STRING NOT NULL,
    "password" STRING NOT NULL,

    CONSTRAINT "SPXUser_pkey" PRIMARY KEY ("username")
);

-- CreateIndex
CREATE UNIQUE INDEX "SPXUser_username_key" ON "SPXUser"("username");
