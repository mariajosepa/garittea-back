-- CreateTable
CREATE TABLE "order" (
    "idOrder" SERIAL NOT NULL,
    "creationdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user" INTEGER NOT NULL,
    "applicantperson" INTEGER NOT NULL,
    "managingperson" INTEGER NOT NULL,
    "debtamount" INTEGER NOT NULL,
    "state" INTEGER NOT NULL DEFAULT 1,
    "faculty" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("idOrder")
);

-- CreateTable
CREATE TABLE "bill" (
    "id" SERIAL NOT NULL,
    "idbill" INTEGER NOT NULL,
    "billdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" INTEGER NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'activo',

    CONSTRAINT "bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creditNote" (
    "idcreditNote" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "initialBillId" INTEGER NOT NULL,
    "finalBillId" INTEGER,

    CONSTRAINT "creditNote_pkey" PRIMARY KEY ("idcreditNote")
);

-- CreateTable
CREATE TABLE "faculty" (
    "idfaculty" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "phone" TEXT NOT NULL,
    "associatedemails" VARCHAR(45) NOT NULL,
    "inchargeperson" INTEGER,

    CONSTRAINT "faculty_pkey" PRIMARY KEY ("idfaculty")
);

-- CreateTable
CREATE TABLE "person" (
    "idperson" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "lastname" VARCHAR(45) NOT NULL,
    "cellphone" TEXT NOT NULL,

    CONSTRAINT "person_pkey" PRIMARY KEY ("idperson")
);

-- CreateTable
CREATE TABLE "email" (
    "idEmail" SERIAL NOT NULL,
    "email" VARCHAR(300) NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "email_pkey" PRIMARY KEY ("idEmail")
);

-- CreateTable
CREATE TABLE "facultyEmail" (
    "idEmail" SERIAL NOT NULL,
    "email" VARCHAR(300) NOT NULL,
    "facultyId" INTEGER NOT NULL,

    CONSTRAINT "facultyEmail_pkey" PRIMARY KEY ("idEmail")
);

-- CreateTable
CREATE TABLE "users" (
    "idusers" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" VARCHAR(45) NOT NULL,
    "lastname" VARCHAR(45) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("idusers")
);

-- CreateIndex
CREATE INDEX "order_applicantperson_idx" ON "order"("applicantperson");

-- CreateIndex
CREATE INDEX "order_faculty_idx" ON "order"("faculty");

-- CreateIndex
CREATE INDEX "order_managingperson_idx" ON "order"("managingperson");

-- CreateIndex
CREATE INDEX "order_user_idx" ON "order"("user");

-- CreateIndex
CREATE UNIQUE INDEX "bill_idbill_key" ON "bill"("idbill");

-- CreateIndex
CREATE INDEX "bill_idbill_idx" ON "bill"("idbill");

-- CreateIndex
CREATE INDEX "faculty_inchargeperson_idx" ON "faculty"("inchargeperson");

-- CreateIndex
CREATE UNIQUE INDEX "email_personId_key" ON "email"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "facultyEmail_facultyId_key" ON "facultyEmail"("facultyId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_applicantperson_fkey" FOREIGN KEY ("applicantperson") REFERENCES "person"("idperson") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_managingperson_fkey" FOREIGN KEY ("managingperson") REFERENCES "person"("idperson") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_faculty_fkey" FOREIGN KEY ("faculty") REFERENCES "faculty"("idfaculty") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("idusers") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill" ADD CONSTRAINT "bill_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("idOrder") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creditNote" ADD CONSTRAINT "creditNote_initialBillId_fkey" FOREIGN KEY ("initialBillId") REFERENCES "bill"("idbill") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creditNote" ADD CONSTRAINT "creditNote_finalBillId_fkey" FOREIGN KEY ("finalBillId") REFERENCES "bill"("idbill") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculty" ADD CONSTRAINT "faculty_inchargeperson_fkey" FOREIGN KEY ("inchargeperson") REFERENCES "person"("idperson") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email" ADD CONSTRAINT "email_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("idperson") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facultyEmail" ADD CONSTRAINT "facultyEmail_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculty"("idfaculty") ON DELETE RESTRICT ON UPDATE CASCADE;
