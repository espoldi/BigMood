//import orm.js into burger.js//
const orm = require("../config/orm.js");

//create the code that will call the ORM functions using burger specific input for the ORM//
const burger = {
    all(callback) {
        orm.all(function (res) {
            callback(res);
        });
    },

    insert(burger_name, callback) {
        orm.insert(burger_name, function (res) {
            callback(res);
        });
    },

    update(id, callback) {
        orm.update(id, function (res) {
            callback(res);
        });
    }
};

//Export the burger.js file//
module.exports = burger;