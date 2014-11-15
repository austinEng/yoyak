var express = require('express');
var router = express.Router();
var User = require("../models/user");


router.get('/', function(req, res) {
    var user = {};
    user.username = req.query.username;
    user.location  = req.query.location.split(";");
    User.addUser(user, function(err, result) {
        if (err) console.log(err);
        //push via socketio
        console.log(result);
        //res.send(result);

    });

});

router.get('/location', function(req, res) {
    var lat = req.query.lat;
    var lon  = req.query.lon;
    User.nearbyUsers(1000, lat, lon, function(err, result) {
        if (err) console.log(err);

        console.log(result);
        res.send(result);
        //gets users within radius
        //display this info
    });

});

module.exports = router;
