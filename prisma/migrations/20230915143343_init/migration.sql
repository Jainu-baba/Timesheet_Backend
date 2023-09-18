/*
  Warnings:

  - You are about to drop the `EmployeeData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EmployeeData";

-- CreateTable
CREATE TABLE "EmployeeInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "daterange" TEXT NOT NULL,
    "totalhours" INTEGER NOT NULL,

    CONSTRAINT "EmployeeInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimesheetData" (
    "id" SERIAL NOT NULL,
    "projectCode" TEXT NOT NULL,
    "jobCode" TEXT NOT NULL,
    "day1" INTEGER NOT NULL,
    "day2" INTEGER NOT NULL,
    "day3" INTEGER NOT NULL,
    "day4" INTEGER NOT NULL,
    "day5" INTEGER NOT NULL,
    "day6" INTEGER NOT NULL,
    "day7" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "status" TEXT,
    "authorId" INTEGER,

    CONSTRAINT "TimesheetData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimesheetData" ADD CONSTRAINT "TimesheetData_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "EmployeeInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
