/* eslint-disable linebreak-style */

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function (app) {

  const delPass2 = (val) => {
    delete val.dataValues.User.dataValues.password;
    delete val.dataValues.User.dataValues.ThemeId;
    return val;
  };

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.render("signup", {
      style: "signup.css"
    });
  });

  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.render("login", {
      style: "login.css"
    });
  });

  // Add isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/dashboard", isAuthenticated, (req, res) => {
    db.UserData.findAll({
      where: {
        userId: req.user.id
      },
      include: [db.User, db.Mood, db.Activity]
    }).then((result) => {
      result.forEach((val) => {
        delPass2(val); // Excluding password and unnessary key from result
      });
      res.render("dashboard", {
        style: "dashboard.css",
        entries: result
      });
    });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

};