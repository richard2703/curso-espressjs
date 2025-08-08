const reservationsService = require('../services/reservationsService');

exports.createReservations = async (req, res) => {
    try{
        const reservation = await reservationsService.createReservation(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la reserva.' });
    }
};

exports.getReservations = async (req, res) => {
    try{
        const reservations = await reservationsService.getReservation(req.params.id);
        if(!reservations){
            return res.status(404).json({ error: 'Reserva no encontrada.' });
        }
        res.json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las reservas.' });
    }
};

exports.updateReservations = async (req, res) => {
    try{
        const reservation = await reservationsService.updateReservation(req.params.id, req.body);
        if(!reservation){
            return res.status(404).json({ error: 'Reserva no encontrada.' });
        }
        res.json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la reserva.' });
    }
};

exports.deleteReservations = async (req, res) => {
    try{
        const reservation = await reservationsService.deleteReservation(req.params.id);
        if(!reservation){
            return res.status(404).json({ error: 'Reserva no encontrada.' });
        }
        res.json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la reserva.' });
    }
};

