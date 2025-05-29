import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const adminPasswordHash = await bcrypt.hash('admin123', 10);

  const user = await prisma.users.create({
    data: {
      firstname: 'Admin',
      lastname: 'User',
      email: 'admin@example.com',
      password: adminPasswordHash,
      role: 2, // Assuming 2 is the role for admin
    },
  });

  const person1 = await prisma.person.create({
    data: {
      name: 'Laura',
      lastname: 'Ramírez',
      cellphone: faker.phone.number(),
      email: {
        create: {
          email: faker.internet.email(),
        },
      },
    },
  });

  const person2 = await prisma.person.create({
    data: {
      name: 'Juan',
      lastname: 'González',
      cellphone: faker.phone.number(),
      email: {
        create: {
          email: faker.internet.email(),
        },
      },
    },
  });

  const faculty = await prisma.faculty.create({
    data: {
      name: 'Facultad de Ingeniería',
      phone: faker.phone.number(),
      associatedemails: faker.internet.email(),
      facultyEmail: {
        create: {
          email: faker.internet.email(),
        },
      },
      person: { connect: { idperson: person1.idperson } },
    },
  });

  const orders = [];
  for (let i = 0; i < 10; i++) {
    const order = await prisma.order.create({
      data: {
        user: user.idusers,
        applicantperson: person1.idperson,
        managingperson: person2.idperson,
        debtamount: faker.number.int({ min: 1000, max: 10000 }),
        faculty: faculty.idfaculty,
      },
    });
    orders.push(order);
  }

  let nextIdbill = 1000;
  const bills = [];

  for (const order of orders) {
    const bill = await prisma.bill.create({
      data: {
        idbill: nextIdbill++,
        orderId: order.idOrder,
      },
    });
    bills.push(bill);
  }

  let nextIdcreditNote = 5000;
  for (let i = 0; i < 5; i++) {
    await prisma.creditNote.create({
      data: {
        idcreditNote: nextIdcreditNote++,
        initialBillId: bills[i].idbill,
        amount: faker.number.int({ min: 1000, max: 5000 }),
        reason: faker.lorem.sentence(3),
        state: 'activa',
        finalBillId: null,
      },
    });
  }

  console.log('✅ Seed complete.');
}

main()
  .catch(e => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
