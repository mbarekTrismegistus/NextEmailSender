/*
  Warnings:

  - Added the required column `sender` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `template` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "recievers" TEXT[],
ADD COLUMN     "sender" TEXT NOT NULL,
ADD COLUMN     "template" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL;
