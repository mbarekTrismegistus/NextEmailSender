/*
  Warnings:

  - You are about to drop the `Click` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_emailKey_fkey";

-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "clicks" JSONB[];

-- DropTable
DROP TABLE "Click";
