-- CreateTable
CREATE TABLE "bills" (
    "idbills" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "route" VARCHAR(300) NOT NULL,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("idbills")
);

-- CreateTable
CREATE TABLE "credit" (
    "idcredit" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "applicantperson" INTEGER NOT NULL,
    "managingperson" INTEGER,
    "debtamount" INTEGER NOT NULL,
    "state" INTEGER NOT NULL,
    "faculty" INTEGER NOT NULL,
    "bill" INTEGER,

    CONSTRAINT "credit_pkey" PRIMARY KEY ("idcredit")
);

-- CreateTable
CREATE TABLE "faculty" (
    "idfaculty" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "phone" INTEGER NOT NULL,
    "associatedemails" VARCHAR(45) NOT NULL,
    "inchargeperson" INTEGER,

    CONSTRAINT "faculty_pkey" PRIMARY KEY ("idfaculty")
);

-- CreateTable
CREATE TABLE "person" (
    "idperson" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "cellphone" INTEGER NOT NULL,
    "canmanage" BYTEA NOT NULL DEFAULT '\x30',

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
    "firstname" VARCHAR(45) NOT NULL,
    "lastname" VARCHAR(45) NOT NULL,
    "password" VARCHAR(45) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("idusers")
);

-- CreateIndex
CREATE INDEX "applicantperson_idx" ON "credit"("applicantperson");

-- CreateIndex
CREATE INDEX "bill_idx" ON "credit"("bill");

-- CreateIndex
CREATE INDEX "faculty_idx" ON "credit"("faculty");

-- CreateIndex
CREATE INDEX "managingperson_idx" ON "credit"("managingperson");

-- CreateIndex
CREATE INDEX "user_idx" ON "credit"("user");

-- CreateIndex
CREATE INDEX "inchargeperson_idx" ON "faculty"("inchargeperson");

-- CreateIndex
CREATE UNIQUE INDEX "email_personId_key" ON "email"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "facultyEmail_facultyId_key" ON "facultyEmail"("facultyId");

-- AddForeignKey
ALTER TABLE "credit" ADD CONSTRAINT "applicantperson" FOREIGN KEY ("applicantperson") REFERENCES "person"("idperson") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "credit" ADD CONSTRAINT "bill" FOREIGN KEY ("bill") REFERENCES "bills"("idbills") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "credit" ADD CONSTRAINT "faculty" FOREIGN KEY ("faculty") REFERENCES "faculty"("idfaculty") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "credit" ADD CONSTRAINT "managingperson" FOREIGN KEY ("managingperson") REFERENCES "person"("idperson") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "credit" ADD CONSTRAINT "user" FOREIGN KEY ("user") REFERENCES "users"("idusers") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "faculty" ADD CONSTRAINT "inchargeperson" FOREIGN KEY ("inchargeperson") REFERENCES "person"("idperson") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "email" ADD CONSTRAINT "person" FOREIGN KEY ("personId") REFERENCES "person"("idperson") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "facultyEmail" ADD CONSTRAINT "faculty" FOREIGN KEY ("facultyId") REFERENCES "faculty"("idfaculty") ON DELETE NO ACTION ON UPDATE NO ACTION;
