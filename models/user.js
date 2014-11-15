var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    count: Number,
    loc: {
        index: '2dsphere',
        type: [Number]
    }
});


userSchema.statics.addUser = function (user, callback) {
    var that = this;
    var usr = user;
    that.findOne({'username': user.username}, function (err, result) {
        if (!err && result) {
            //user exists
            console.log("user exists");
            that.update({'username': usr.username}, {$inc: {count: 1}}, function (err, res) {
                if (!err){
                    result.count++;
                    console.log(result);
                }
                callback(null, result);
            });
        }
        else {
            console.log(usr.username);
            //save user details
            var user = new that({
                username: usr.username,
                count: 14,
                loc: usr.location
            });

            user.save(function (err) {
                callback(err, user);
            })


        }
    })
};

userSchema.statics.nearbyUsers = function (maxdist, lat, lon, callback) {
    var that = this;
    var findParams = {
        loc: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lat, lon]
                },
                $maxDistance: 1000
            }
        }
    };

    that.find(findParams, function (err, results) {
        callback(err, results);
    });
};

module.exports = mongoose.model('user', userSchema);