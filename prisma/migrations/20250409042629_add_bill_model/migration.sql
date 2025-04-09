-- CreateTable
CREATE TABLE "bill" (
    "idbill" SERIAL NOT NULL,
    "creditId" INTEGER NOT NULL,

    CONSTRAINT "bill_pkey" PRIMARY KEY ("idbill")
);

-- CreateIndex
CREATE UNIQUE INDEX "bill_creditId_key" ON "bill"("creditId");

-- AddForeignKey
ALTER TABLE "bill" ADD CONSTRAINT "bill_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "credit"("idcredit") ON DELETE RESTRICT ON UPDATE CASCADE;
