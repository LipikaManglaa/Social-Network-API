const router = require('express').Router();

const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/th', thoughtRoutes);

module.exports = router;
