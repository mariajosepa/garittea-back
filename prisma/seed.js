import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const NUM_USERS = 10;
const NUM_PEOPLE = 20;
const NUM_FACULTIES = 5;
const NUM_CREDITS = 50;

async function main() {
  console.log(`🌱 Start seeding ...`);

  // 1. Users
  const createdUsers = [];
  for (let i = 0; i < NUM_USERS; i++) {
    const user = await prisma.users.create({
      data: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        password: faker.internet.password(),
      },
    });
    createdUsers.push(user);
  }

  // 2. People
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

  // 3. Faculties
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

  // 4. Credits + Bills
  let createdCredits = 0;
  for (let i = 0; i < NUM_CREDITS; i++) {
    const randomUser = faker.helpers.arrayElement(createdUsers);
    const randomApplicant = faker.helpers.arrayElement(createdPeople);
    const randomManager = faker.helpers.arrayElement(
      [null, ...createdPeople.filter(p => p.idperson !== randomApplicant.idperson)]
    );
    const randomFaculty = faker.helpers.arrayElement(createdFaculties);

    try {
      // Creamos el credit primero
      const credit = await prisma.credit.create({
        data: {
          user: randomUser.idusers,
          applicantperson: randomApplicant.idperson,
          managingperson: randomManager?.idperson || randomApplicant.idperson,
          debtamount: faker.number.int({ min: 1000, max: 50000 }),
          state: faker.number.int({ min: 1, max: 3 }),
          faculty: randomFaculty.idfaculty,
        },
      });

      // Luego creamos el bill asociado a ese credit
      await prisma.bill.create({
        data: {
          creditId: credit.idcredit,
        },
      });

      createdCredits++;
    } catch (err) {
      console.error(`❌ Error creating credit #${i + 1}:`, err.message);
    }
  }

  console.log(`✅ ${createdCredits} credits with associated bills created.`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
