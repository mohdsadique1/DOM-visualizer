const express = require('express');
const Model = require('../models/userModel');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifytoken');
require('dotenv').config();

const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);
    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                res.status(500).json({ message: 'Email Already Registered ' });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
});

router.get('/getbycity/:city', (req, res) => {
    Model.find({ city: req.params.city })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    // console.log(req.body);
    //res.send('delete response from user');
});

router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    //res.send('update response from user');
});

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    // res.send('getbyid response from user');
});

router.post('/authenticate', (req, res) => {
    console.log(req.body);
    
    Model.findOne(req.body)
        .then((result) => {

            if (result) {
                //     email and password matched
                //  generate token
                const { _id, name, email, profile } = result;
                const payload = { _id, name, email, profile };

                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: 60 },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err);
                        } else {
                            res.status(200).json({ token, profile });
                        }

                    })
            } else {
                //    not matched
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });

})

module.exports = router;