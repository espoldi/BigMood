/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

$(document).ready(function () {
  M.AutoInit(); // Initialize Toasts
  // Getting references to the form and input
  let signUpForm = $("form.signup");
  let emailInput = $("input#email-input");
  let nameInput = $("input#name-input");
  let passwordInput = $("input#password-input");

  // When the signup button is clicked, non-blank email and password are validated
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    let userData = {
      email: emailInput.val().trim(),
      name: nameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      M.toast({ html: "Ooops! <br> You forgot to enter your email and/or password.", classes: "rounded" });
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.name, userData.password);
    emailInput.val("");
    nameInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the dashboard page
  // Otherwise we log any errors
  function signUpUser(email, name, password) {
    $.post("/api/signup", {
      email: email,
      name: name,
      password: password
    })
      .then((data) => {
        window.location.replace("/dashboard");
      }) // If there's an error, handle it by throwing up an alert
      .catch((error) => { // If there's an error, log the error
        console.log(error); // FOR TESTING
        if (error.status === 401) {
          M.toast({ html: "The email already exists or you forgot to enter the username. Please try again or go to the login page.", classes: "rounded" });
        }
      });
  }

});