-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "distroId" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesktopEnvironment" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "distroId" INTEGER,

    CONSTRAINT "DesktopEnvironment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distro" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "basedOn" VARCHAR(255) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Distro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaitingDistro" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "website" VARCHAR(255) NOT NULL,
    "brief" VARCHAR(255) NOT NULL,
    "logo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaitingDistro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WaitingDistro_email_key" ON "WaitingDistro"("email");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_distroId_fkey" FOREIGN KEY ("distroId") REFERENCES "Distro"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesktopEnvironment" ADD CONSTRAINT "DesktopEnvironment_distroId_fkey" FOREIGN KEY ("distroId") REFERENCES "Distro"("id") ON DELETE SET NULL ON UPDATE CASCADE;
