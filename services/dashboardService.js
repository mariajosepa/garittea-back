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

  export const notasPorAnioService = async () => {
    const currentYear = new Date().getFullYear();
    const years = [currentYear - 2, currentYear - 1, currentYear];
  
    const results = await Promise.all(
      years.map(async (year) => {
        const notas = await prisma.creditNote.findMany({
          where: {
            initialBill: {
              billdate: {
                gte: startOfYear(new Date(year, 0)),
                lte: endOfYear(new Date(year, 11)),
              },
            },
          },
        });
  
        const total = notas.reduce((sum, nota) => sum + nota.amount, 0);
        return { year, total };
      })
    );
  
    return results;
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

  export const carteraPagadaAnioService = async () => {
    const { _sum } = await prisma.order.aggregate({
      _sum: { debtamount: true },
      where: {
        state: 3, // Pagado
        creationdate: {
          gte: startOfYear(new Date()),
          lte: endOfYear(new Date()),
        },
      },
    });
  
    return _sum.debtamount ?? 0;
  };

  export const carteraPagadaUltimosAniosService = async () => {
    const currentYear = new Date().getFullYear();
  
    const years = [currentYear - 2, currentYear - 1, currentYear];
  
    const resultados = await Promise.all(
      years.map(async (year) => {
        const { _sum } = await prisma.order.aggregate({
          _sum: { debtamount: true },
          where: {
            state: 3, // Pagado
            creationdate: {
              gte: new Date(`${year}-01-01T00:00:00Z`),
              lte: new Date(`${year}-12-31T23:59:59Z`),
            },
          },
        });
  
        return {
          year,
          total: _sum.debtamount ?? 0,
        };
      })
    );
  
    return resultados;
  };
  
  
  export const carteraMorosaAnioService = async () => {
    const { _sum } = await prisma.order.aggregate({
      _sum: { debtamount: true },
      where: {
        state: 1, // Pendiente
        creationdate: {
          gte: startOfYear(new Date()),
          lte: endOfYear(new Date()),
        },
      },
    });
  
    return _sum.debtamount ?? 0;
  };
  
  export const carteraMorosaUltimosAniosService = async () => {
    const currentYear = new Date().getFullYear();
  
    const years = [currentYear - 2, currentYear - 1, currentYear];
  
    const resultados = await Promise.all(
      years.map(async (year) => {
        const { _sum } = await prisma.order.aggregate({
          _sum: { debtamount: true },
          where: {
            state: 1, // Pendiente
            creationdate: {
              gte: new Date(`${year}-01-01T00:00:00Z`),
              lte: new Date(`${year}-12-31T23:59:59Z`),
            },
          },
        });
  
        return {
          year,
          total: _sum.debtamount ?? 0,
        };
      })
    );
  
    return resultados;
  };