/*
  Warnings:

  - You are about to drop the column `basePrice` on the `BookingPackage` table. All the data in the column will be lost.
  - You are about to drop the column `packageName` on the `BookingPackage` table. All the data in the column will be lost.
  - Added the required column `price` to the `BookingPackage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `BookingPackage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BookingPackage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "DrinkCategory" AS ENUM ('ALCOHOLIC', 'NON_ALCOHOLIC');

-- AlterTable
ALTER TABLE "BookingPackage" DROP COLUMN "basePrice",
DROP COLUMN "packageName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CocktailItem" ADD COLUMN     "category" "DrinkCategory" NOT NULL DEFAULT 'ALCOHOLIC',
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "message" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
