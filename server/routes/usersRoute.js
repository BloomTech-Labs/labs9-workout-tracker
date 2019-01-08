const express = require('express');
const db = require('../database/dbConfig')
const router = express.Router();

router.get('/info/:id', (req, res) => {
    db('users')
        .where('id', '=', req.params.id)
        .then(userInfo => {
            if(userInfo.length === 0) {
                res.status(404).json({message: "That user doesnt exist"});
            }
            res.status(200).json(userInfo);
        })
        .catch(error => {
            res.status(500).json({error, "Well this is embarrassing": "Something went wrong"})
        }) 
})


module.exports = router;
