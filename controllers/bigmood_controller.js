const express = require("express");
const burger = require("../models/burger.js");
const router = express();

//index page//
router.get('/', function (req, res) {
    burger.all(function (data) {
        res.render('', { burgers: data });
    });
});

//add a burger//
router.post('/api/add', function (req, res) {
    burger.insert(req.body.burger_name, function () {
        res.redirect('/');
    });
});


router.post('/api/burgers/:id', function (req, res) {
    burger.update(req.params.id, function () {
        res.redirect('/');
    });
});

//export the router at the end of your file//
module.exports = router;