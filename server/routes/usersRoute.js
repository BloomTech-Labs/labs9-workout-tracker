const express = require('express');
const db = require('../database/dbConfig')
const router = express.Router();

router.get('/info/:id', async (req, res) => {
    try {
        const userInfo = await db('users').where('id', '=', req.params.id);
        if(userInfo.length === 0) {
            res.status(404).json({message: "That user doesnt exist"});
        }
        res.status(200).json(userInfo[0]);
    } catch(error) {
        res.status(500).json({error, "Well this is embarrassing": "Something went wrong"})
    }
})


module.exports = router;
