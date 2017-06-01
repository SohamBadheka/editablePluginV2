/* Save new information. */

var monk = require('monk');
var db = monk('localhost:27017/userInformation'); //Database that will hold the data

var collection =  db.get('userInfo'); //Collection which will contain user entries

/* This API will give you all the users in the database to start off the application */

exports.getUserDetails = function(req, res){
    collection.find({}, function(e, data){

        console.log("all users: "+data[0]);
        if(data){
            res.send({"data" : data[0], "status" : "200"})
        }
        else{
            res.send({"status" : "400"})
        }
    })

}

/* This API will save/update the user information in the database */

exports.saveUserDetails = function(req, res){

    var userType = req.param('level');
    var name =  req.param('name');
    console.log(userType);

    collection.update({name : name}, {$set : {userType: userType} }, {upsert : true}, function (e, data) {

        if (data) {
            collection.find({}, function(e, data){

                console.log("after update: ");
                console.log(JSON.stringify(data[0]))
                if(data){
                    res.send({"data" : data[0], "status" : "200"})
                }
                else {
                    res.send({"status": "400"})
                }
            });
        }

        else {
            res.send({"status" : "400"});
        }
    });

};
