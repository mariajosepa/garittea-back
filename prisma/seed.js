import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// --- Configuration ---
const NUM_USERS = 10;
const NUM_PEOPLE = 20; // Should be >= NUM_FACULTIES if faculties might need incharge persons
const NUM_FACULTIES = 5;
const NUM_CREDITS = 50;
// ---------------------

async function main() {
  console.log(`Start seeding ...`);

  // --- Optional: Clear Existing Data (Use with caution!) ---
  // Delete in reverse order of creation due to dependencies
  /*
  console.log('Deleting existing data...');
  await prisma.credit.deleteMany({});
  await prisma.facultyEmail.deleteMany({});
  await prisma.faculty.deleteMany({});
  await prisma.email.deleteMany({});
  await prisma.person.deleteMany({});
  await prisma.users.deleteMany({});
  console.log('Existing data deleted.');
  */
  // --- --- --- --- --- --- --- --- --- --- --- --- --- ---

  // 1. Create Users
  console.log(`Creating ${NUM_USERS} users...`);
  const createdUsers = [];
  for (let i = 0; i < NUM_USERS; i++) {
    const user = await prisma.users.create({
      data: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        // WARNING: Storing plain text passwords is bad practice! Hash passwords in real apps.
        password: faker.internet.password(),
      },
    });
    createdUsers.push(user);
  }
  console.log(`${createdUsers.length} users created.`);

  // 2. Create People and their Emails
  console.log(`Creating ${NUM_PEOPLE} people and their emails...`);
  const createdPeople = [];
  for (let i = 0; i < NUM_PEOPLE; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const person = await prisma.person.create({
      data: {
        name: `${firstName} ${lastName}`,
        // Generate string-based phone number
        cellphone: faker.phone.number(), // Updated to use faker.phone.number()
        // Create the related email record right after creating the person
        email: {
          create: {
            email: faker.internet.email({ firstName, lastName }),
          },
        },
        // 'canmanage' field removed from schema, no longer needed here
      },
    });
    createdPeople.push(person);
  }
  console.log(`${createdPeople.length} people created.`);

  // 3. Create Faculties and their Emails
  console.log(`Creating ${NUM_FACULTIES} faculties and their emails...`);
  const createdFaculties = [];
  for (let i = 0; i < NUM_FACULTIES; i++) {
    // Optionally assign an incharge person from the created people
    const maybeInchargePerson = faker.helpers.arrayElement([null, ...createdPeople]);

    const facultyData = {
        name: faker.company.name() + ' Faculty',
        // Generate string-based phone number
        phone: faker.phone.number(), // Updated to use faker.phone.number()
        associatedemails: faker.internet.email(), // Generate one associated email string
        facultyEmail: {
            create: {
                email: faker.internet.email(), // Generate a specific faculty email
            },
        },
        // Conditionally connect inchargeperson
        ...(maybeInchargePerson && { // Use spread syntax for conditional connection
          person: {
            connect: { idperson: maybeInchargePerson.idperson }
          }
        })
    };

    const faculty = await prisma.faculty.create({ data: facultyData });
    createdFaculties.push(faculty);
  }
   console.log(`${createdFaculties.length} faculties created.`);

  // 4. Create Credits
  console.log(`Creating ${NUM_CREDITS} credits...`);
  let createdCreditsCount = 0;
  for (let i = 0; i < NUM_CREDITS; i++) {
    if (!createdUsers.length || !createdPeople.length || !createdFaculties.length) {
        console.warn("Cannot create credits: Missing required related Users, People, or Faculties.");
        break;
    }

    const randomUser = faker.helpers.arrayElement(createdUsers);
    const randomApplicant = faker.helpers.arrayElement(createdPeople);
    const randomManager = faker.helpers.arrayElement([null, ...createdPeople.filter(p => p.idperson !== randomApplicant.idperson)]); // Ensure manager is not applicant
    const randomFaculty = faker.helpers.arrayElement(createdFaculties);

    const creditData = {
        user: randomUser.idusers,
        applicantperson: randomApplicant.idperson,
        debtamount: faker.number.int({ min: 500, max: 50000 }),
        // Generate state between 1 and 3 inclusive
        state: faker.number.int({ min: 1, max: 3 }), // Updated range
        faculty: randomFaculty.idfaculty,
        // Conditionally connect managingperson
        ...(randomManager && { managingperson: randomManager.idperson })
    };

     try {
        await prisma.credit.create({ data: creditData });
        createdCreditsCount++;
     } catch (error) {
         console.error(`Failed to create credit ${i+1}:`, error);
         console.error("Data attempted:", JSON.stringify(creditData, null, 2)); // Log data on error
     }
  }
  console.log(`${createdCreditsCount} credits created.`);

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Disconnecting Prisma Client...');
    await prisma.$disconnect();
  });