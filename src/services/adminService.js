const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

const createTimeBlockService = async (startTime, endTime) => {
    const newTimeBlock = await prisma.timeBlock.create({
        data: {
            startTime: new Date(startTime),
            endTime: new Date(endTime)
        }
    });
    return newTimeBlock;
};

const listReservationsService = async () => {
    const reservations = await prisma.appointment.findMany({
        include: {
            timeBlock: true,
            user: true
        }
    });
    return reservations;
};

module.exports = { createTimeBlockService, listReservationsService };