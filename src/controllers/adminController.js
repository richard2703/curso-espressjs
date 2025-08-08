const {createTimeBlockService, listReservationsService} = require('../services/adminService');

const createTimeBlock = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ error: 'Acceso denegado' });
    }
    try {
        const { startTime, endTime } = req.body;
        const timeBlock = await createTimeBlockService(startTime, endTime);
        res.status(201).json(timeBlock);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el bloque de tiempo.' });
        
    }
    
};

const listReservations = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ error: 'Acceso denegado' });
    }
    try {
        const reservations = await listReservationsService();
        res.json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las reservas.' });
    }
    
};

module.exports = {
    createTimeBlock,
    listReservations
};