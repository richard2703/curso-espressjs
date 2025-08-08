const { createTimeBlock } = require('../controllers/adminController');
const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

exports.createReservation = async (reservationData) => {
    const conflict = await prisma.appointment.findFirst({
        // where: {
        //     startTime: reservationData.startTime,
        //     endTime: reservationData.endTime
        // }
        where: {
            date: reservationData.date,
            timeBlockId: reservationData.TimeBlockId
        }
    });
    if (conflict) {
        throw new Error('El horario de la reserva ya está ocupado.');
    }
    return prisma.appointment.create({ data: reservationData });
    
};

exports.getReservation = async (userId) => {
    return prisma.appointment.findUnique({ where: { id: parseInt(userId,10) } });
};

// exports.getReservation = id => {
//   return prisma.appointment.findUnique({
//     where: { id: parseInt(id, 10) }
//   });
// };

exports.updateReservation = async (reservationId, reservationData) => {
    const conflict = await prisma.appointment.findFirst({
        // where: {
        //     startTime: reservationData.startTime,
        //     endTime: reservationData.endTime
        // }
        where: {
            date: reservationData.date,
            timeBlockId: reservationData.TimeBlockId,
            id: { not: parseInt(reservationId,10) }
        }
    });
    if (conflict) {
        throw new Error('El horario de la reserva ya está ocupado.');
    }
    return prisma.appointment.update({
        where: { id: parseInt(reservationId,10) },
        data: reservationData
    })
};

// exports.updateReservation = async (id, data) => {
//   const conflict = await prisma.appointment.findFirst({
//     where: {
//       date: data.date,
//       timeBlockId: data.timeBlockId,
//       id: { not: parseInt(id, 10) }
//     }
//   });
//   if (conflict) {
//     throw new Error('El horario solicitado ya está ocupado');
//   }
//   return prisma.appointment.update({
//     where: { id: parseInt(id, 10) },
//     data
//   });
// };

exports.deleteReservation = async (reservationId) => {
    return prisma.appointment.delete({ where: { id: parseInt(reservationId,10) } });
};

