/*
  Warnings:

  - The primary key for the `Distro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `basedOn` on the `Distro` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Distro` table. All the data in the column will be lost.
  - The primary key for the `WaitingDistro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `brief` on the `WaitingDistro` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `WaitingDistro` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DesktopEnvironment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Distro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Distro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Distro` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_distroId_fkey";

-- DropForeignKey
ALTER TABLE "DesktopEnvironment" DROP CONSTRAINT "DesktopEnvironment_distroId_fkey";

-- AlterTable
ALTER TABLE "Distro" DROP CONSTRAINT "Distro_pkey",
DROP COLUMN "basedOn",
DROP COLUMN "published",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "website" VARCHAR(255) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "Distro_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Distro_id_seq";

-- AlterTable
ALTER TABLE "WaitingDistro" DROP CONSTRAINT "WaitingDistro_pkey",
DROP COLUMN "brief",
DROP COLUMN "createdAt",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "website" SET DATA TYPE TEXT,
ADD CONSTRAINT "WaitingDistro_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "WaitingDistro_id_seq";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "DesktopEnvironment";
