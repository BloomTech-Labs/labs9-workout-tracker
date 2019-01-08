const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Alive at port: 9001")
})

module.exports = router;
