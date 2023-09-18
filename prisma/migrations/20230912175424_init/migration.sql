-- CreateTable
CREATE TABLE "EmployeesList" (
    "list" TEXT NOT NULL,
    "cretedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeesList_list_key" ON "EmployeesList"("list");
