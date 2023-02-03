const express = require('express');
const router = express.Router();
const {

} = require('../controllers/takes');

router.get('/takes', getTakes);
router.post('/takes', createTakes);
router.delete('/takes', deleteTakes);
router.put('/takes', updateTakes);

module.export = router;

