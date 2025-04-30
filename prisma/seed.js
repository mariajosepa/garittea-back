import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const NUM_USERS = 10;
const NUM_PEOPLE = 20;
const NUM_FACULTIES = 5;
const NUM_ORDERS = 50;
const NUM_CREDIT_NOTES = 10;

async function main() {
  console.log(`🌱 Start seeding ...`);

  // 1. Admin user
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.users.create({
    data: {
      firstname: 'Admin',
      lastname: 'User',
      email: 'admin@example.com',
      password: adminPasswordHash,
    },
  });

  const createdUsers = [admin];

  // 2. Random users
  for (let i = 0; i < NUM_USERS; i++) {
    const user = await prisma.users.create({
      data: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
      },
    });
    createdUsers.push(user);
  }

  // 3. People
  const createdPeople = [];
  for (let i = 0; i < NUM_PEOPLE; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const person = await prisma.person.create({
      data: {
        name: firstName,
        lastname: lastName,
        cellphone: faker.phone.number(),
        email: {
          create: {
            email: faker.internet.email({ firstName, lastName }),
          },
        },
      },
    });
    createdPeople.push(person);
  }

  // 4. Faculties
  const createdFaculties = [];
  for (let i = 0; i < NUM_FACULTIES; i++) {
    const maybeIncharge = faker.helpers.arrayElement([null, ...createdPeople]);
    const faculty = await prisma.faculty.create({
      data: {
        name: faker.company.name() + ' Faculty',
        phone: faker.phone.number(),
        associatedemails: faker.internet.email(),
        facultyEmail: {
          create: {
            email: faker.internet.email(),
          },
        },
        ...(maybeIncharge && {
          person: {
            connect: { idperson: maybeIncharge.idperson },
          },
        }),
      },
    });
    createdFaculties.push(faculty);
  }

  // 5. Orders + Bills
  const createdBills = [];
  for (let i = 0; i < NUM_ORDERS; i++) {
    const randomUser = faker.helpers.arrayElement(createdUsers);
    const randomApplicant = faker.helpers.arrayElement(createdPeople);
    const randomManager = faker.helpers.arrayElement(
      createdPeople.filter(p => p.idperson !== randomApplicant.idperson)
    );
    const randomFaculty = faker.helpers.arrayElement(createdFaculties);

    try {
      const order = await prisma.order.create({
        data: {
          user: randomUser.idusers,
          applicantperson: randomApplicant.idperson,
          managingperson: randomManager.idperson,
          debtamount: faker.number.int({ min: 1000, max: 50000 }),
          faculty: randomFaculty.idfaculty,
        },
      });

      const bill = await prisma.bill.create({
        data: {
          orderId: order.idOrder,
        },
      });

      createdBills.push(bill);
    } catch (err) {
      console.error(`❌ Error creating order #${i + 1}:`, err.message);
    }
  }

  // 6. Credit Notes (usando bills creadas)
  let createdNotes = 0;
  for (let i = 0; i < NUM_CREDIT_NOTES; i++) {
    if (createdBills.length < 2) break;

    const initialBill = faker.helpers.arrayElement(createdBills);
    const finalBill = faker.helpers.arrayElement(
      createdBills.filter(b => b.idbill !== initialBill.idbill)
    );

    try {
      await prisma.creditNote.create({
        data: {
          amount: faker.number.int({ min: 100, max: 3000 }),
          reason: faker.lorem.sentence(3),
          initialBillId: initialBill.idbill,
          finalBillId: finalBill.idbill,
        },
      });
      createdNotes++;
    } catch (err) {
      console.error(`❌ Error creating creditNote #${i + 1}:`, err.message);
    }
  }

  console.log(`✅ ${createdBills.length} orders with bills created.`);
  console.log(`✅ ${createdNotes} credit notes created.`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
