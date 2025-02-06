const express = require('express');
const router = express.Router();

router.route('/')
    .put(async (req, res) => {
        console.log('I received your submission');
        res.status(200).json({ message: 'testing' });
    });

module.exports = router;