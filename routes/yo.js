var express = require('express');
var router = express.Router();
var User = require("../models/user");


router.get('/', function(req, res) {
    var user = {};
    user.username = req.query.username;
    if (typeof req.query.location != "undefined") {
        user.location  = req.query.location.split(";");
        console.log(user);
        User.addUser(user, function(err, result) {
            if (err) console.log(err);
            else {
            GLOBAL.io.emit('data', result);
            //push via socketio
            //console.log(result);
            res.send(result);
            }

        });
    }
    else res.send("Please YO your location :)")

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
