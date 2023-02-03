const express = require('express');
const router = express.Router();
const {
    getTeaches,
    createTeaches,
    deleteTeaches,
    updateTeaches
} = require('../controllers/teaches')

router.get('/teaches', getTeaches);
router.post('/teaches', createTeaches);
router.delete('/teaches', deleteTeaches);
router.put('/teaches', updateTeaches);

module.export = router;
