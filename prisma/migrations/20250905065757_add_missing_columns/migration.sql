/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `acreage` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `listingCategory` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `area` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `areaUnit` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buildingNumber` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floorApartment` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `governorate` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `governorateType` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `landmark` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyType` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearBuilt` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "emailVerified",
DROP COLUMN "image";

-- AlterTable
ALTER TABLE "public"."properties" DROP COLUMN "acreage",
DROP COLUMN "date",
DROP COLUMN "listingCategory",
ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "area" TEXT NOT NULL,
ADD COLUMN     "areaUnit" TEXT NOT NULL,
ADD COLUMN     "buildingNumber" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "floorApartment" TEXT NOT NULL,
ADD COLUMN     "governorate" TEXT NOT NULL,
ADD COLUMN     "governorateType" TEXT NOT NULL,
ADD COLUMN     "landmark" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "propertyType" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "yearBuilt" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Account";

-- DropTable
DROP TABLE "public"."Session";

-- DropTable
DROP TABLE "public"."VerificationToken";
