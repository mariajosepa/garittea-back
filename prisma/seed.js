import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const NUM_USERS = 10;
const NUM_PEOPLE = 20;
const NUM_FACULTIES = 5;
const NUM_ORDERS = 50;

async function main() {
  console.log(`🌱 Start seeding ...`);

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

  let createdOrders = 0;
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

      await prisma.bill.create({
        data: {
          orderId: order.idOrder,
        },
      });

      createdOrders++;
    } catch (err) {
      console.error(`❌ Error creating order #${i + 1}:`, err.message);
    }
  }

  console.log(`✅ ${createdOrders} orders with associated bills created.`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
