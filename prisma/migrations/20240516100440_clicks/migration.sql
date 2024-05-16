/*
  Warnings:

  - The primary key for the `Click` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Click` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Click" DROP CONSTRAINT "Click_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Click_pkey" PRIMARY KEY ("emailKey");
