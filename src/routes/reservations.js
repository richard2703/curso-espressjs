const {Router} = require('express');
const reservationsController = require('../controllers/reservationsController');
const authenticateToken = require('../middlewares/auth');

const router = Router();

router.post('/', authenticateToken, reservationsController.createReservations);
router.get('/:id', authenticateToken, reservationsController.getReservations);
router.put('/:id', authenticateToken, reservationsController.updateReservations);
router.delete('/:id', authenticateToken, reservationsController.deleteReservations);

module.exports = router;