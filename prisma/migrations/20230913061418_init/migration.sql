-- AlterTable
ALTER TABLE "EmployeeData" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "EmployeeData_pkey" PRIMARY KEY ("id");
