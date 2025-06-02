import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando proceso de seeding...');

  // Crear usuario administrador
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const user = await prisma.users.create({
    data: {
      firstname: 'Admin',
      lastname: 'User',
      email: 'admin@example.com',
      password: adminPasswordHash,
      role: 2,
    },
  });

  // Crear personas con sus emails
  const person1 = await prisma.person.create({
    data: {
      name: 'Laura',
      lastname: 'Ramírez',
      cellphone: '3001234567',
      email: {
        create: {
          email: 'laura.ramirez@example.com',
        },
      },
    },
  });

  const person2 = await prisma.person.create({
    data: {
      name: 'Juan',
      lastname: 'González',
      cellphone: '3009876543',
      email: {
        create: {
          email: 'juan.gonzalez@example.com',
        },
      },
    },
  });

  // Crear facultad con email
  const faculty = await prisma.faculty.create({
    data: {
      name: 'Facultad de Ingeniería',
      phone: '6012345678',
      associatedemails: 'ingenieria@example.com',
      inchargeperson: person1.idperson,
      facultyEmail: {
        create: {
          email: 'facultad.ingenieria@example.com',
        },
      },
    },
  });

  // Crear órdenes y facturas
  for (let i = 0; i < 5; i++) {
    // Crear orden
    const order = await prisma.order.create({
      data: {
        user: user.idusers,
        applicantperson: person1.idperson,
        managingperson: person2.idperson,
        debtamount: faker.number.int({ min: 50000, max: 500000 }),
        faculty: faculty.idfaculty,
        state: 1,
        observaciones: faker.lorem.sentence(),
      },
    });

    // Crear factura asociada a la orden
    const bill = await prisma.bill.create({
      data: {
        idbill: 1000 + i,
        orderId: order.idOrder,
        state: 'activo',
      },
    });

    // Crear nota crédito para algunas facturas
    if (i < 3) {
      await prisma.creditNote.create({
        data: {
          idcreditNote: 5000 + i,
          state: 'activa',
          amount: faker.number.int({ min: 10000, max: 50000 }),
          reason: faker.lorem.sentence(),
          initialBillId: bill.idbill,
          finalBillId: null,
        },
      });
    }
  }

  console.log('✅ Seed completado exitosamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });