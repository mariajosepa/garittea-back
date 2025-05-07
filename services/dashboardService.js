import prisma from '../prisma/client.js';
import { startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';

export const ventasCreditoMesService = async () => {
  return await prisma.order.aggregate({
    _sum: { debtamount: true },
    where: {
      creationdate: {
        gte: startOfMonth(new Date()),
        lte: endOfMonth(new Date())
      }
    }
  });
};

export const ventasPorMesService = async () => {
  const inicioAño = startOfYear(new Date());
  const finAño = endOfYear(new Date());

  const ventas = await prisma.order.findMany({
    where: {
      creationdate: {
        gte: inicioAño,
        lte: finAño,
      },
    },
    select: {
      creationdate: true,
      debtamount: true,
    },
  });

  // Inicializar array de 12 meses en 0
  const mensual = Array(12).fill(0);

  for (const venta of ventas) {
    const mes = new Date(venta.creationdate).getMonth(); // 0 = enero, 11 = diciembre
    mensual[mes] += venta.debtamount;
  }

  return mensual;
};


export const notasCreditoAnioService = async () => {
    const notas = await prisma.creditNote.findMany({
      where: {
        initialBill: {
          billdate: {
            gte: startOfYear(new Date()),
            lte: endOfYear(new Date()),
          }
        }
      },
      include: {
        initialBill: true
      }
    });
  
    // Sumar los montos manualmente
    const total = notas.reduce((sum, nota) => sum + nota.amount, 0);
  
    return total;
  };

  export const facultadesTopService = async () => {
    const topFacultades = await prisma.order.groupBy({
      by: ['faculty'],
      _count: { idOrder: true },
      orderBy: { _count: { idOrder: 'desc' } },
      take: 5
    });
  
    const ids = topFacultades.map(f => f.faculty);
  
    const nombres = await prisma.faculty.findMany({
      where: {
        idfaculty: { in: ids }
      },
      select: {
        idfaculty: true,
        name: true
      }
    });
  
    return topFacultades.map(f => ({
      ...f,
      name: nombres.find(n => n.idfaculty === f.faculty)?.name || 'Desconocida'
    }));
  };
  