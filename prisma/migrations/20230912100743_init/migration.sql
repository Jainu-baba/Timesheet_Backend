-- CreateTable
CREATE TABLE "ManagerData" (
    "mangData" TEXT NOT NULL,
    "cretedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "ManagerData_mangData_key" ON "ManagerData"("mangData");
