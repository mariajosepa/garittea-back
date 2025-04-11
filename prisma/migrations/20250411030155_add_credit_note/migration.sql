-- CreateTable
CREATE TABLE "creditNote" (
    "idcreditNote" INTEGER NOT NULL,
    "idInicialBill" INTEGER NOT NULL,
    "idFinishBill" INTEGER,

    CONSTRAINT "creditNote_pkey" PRIMARY KEY ("idcreditNote")
);

-- AddForeignKey
ALTER TABLE "creditNote" ADD CONSTRAINT "creditNote_idInicialBill_fkey" FOREIGN KEY ("idInicialBill") REFERENCES "bill"("idbill") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creditNote" ADD CONSTRAINT "creditNote_idFinishBill_fkey" FOREIGN KEY ("idFinishBill") REFERENCES "bill"("idbill") ON DELETE SET NULL ON UPDATE CASCADE;
