/* eslint-disable linebreak-style */
// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = (app) => {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // GET route for getting all of the quotes
  app.get("/api/quotes", (req, res) => {
    db.Quote.findAll({})
      .then((result) => {
        res.json(result);
      });
  });

  // GET route for getting all of the themes
  app.get("/api/themes", (req, res) => {
    db.Theme.findAll({})
      .then((result) => {
        res.json(result);
      });
  });

  // GET route for getting all of the activities
  app.get("/api/activities", (req, res) => {
    db.Activity.findAll({})
      .then((result) => {
        res.json(result);
      });
  });

  // GET route for getting all of the moods
  app.get("/api/moods", (req, res) => {
    db.Mood.findAll({})
      .then((result) => {
        res.json(result);
      });
  });

  // GET route for getting all of the users with theme
  app.get("/api/users", (req, res) => {
    db.User.findAll({include:[db.Theme]})
      .then((result) => {
        //Excluding password from the result
        const userInfo = [{
          id: result.id,
          email: result.email
        }];
        res.json(userInfo);
      });
  });

  // GET route for retrieveing a single user
  app.get("/api/users/:id", (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include:[db.Theme]
    }).then((result) => {
      res.json(result); // **********TO DO: Excluding password from the array result
    });
  });

  // GET route for retrieveing all user data
  app.get("/api/userdata/:id", (req, res) => {
    db.UserData.findOne({
      where: {
        id: req.params.id
      },
      include:[db.User, db.Mood, db.Activity]
    }).then((result) => {
      res.json(result);
    });
  });


  // *************TO DO: ADD THEME ************** //
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });


  // *************TO DO ************** //
// Get route for returning UserData including Mood, Activity and User
};
