/*
  Warnings:

  - Added the required column `roomUrl` to the `SPXVideoSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SPXVideoSession" ADD COLUMN     "roomUrl" STRING NOT NULL;
