/*
  Warnings:

  - You are about to drop the `EmployeeInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimesheetData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TimesheetData" DROP CONSTRAINT "TimesheetData_authorId_fkey";

-- DropTable
DROP TABLE "EmployeeInfo";

-- DropTable
DROP TABLE "TimesheetData";

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "daterange" TEXT NOT NULL,
    "totalhours" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timesheet" (
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

    CONSTRAINT "Timesheet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Timesheet" ADD CONSTRAINT "Timesheet_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
