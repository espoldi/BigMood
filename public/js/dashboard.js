/* eslint-disable no-unused-vars */
$(document).ready(function () {
  let userName, themeName;
  let userId, themeId;
  let userData = [];

  M.AutoInit(); // Initiate dropdown


  // Function to change color class based on the themeId
  function displayTheme(theme) {
    const themeSwitch = $(".theme-switch");
    let color;
    switch (theme) {
    case 2: color = "black";
      break;
    case 3: color = "red";
      break;
    case 4: color = "blue";
      break;
    case 5: color = "green";
      break;
    default: color = "grey";
    }
    themeSwitch.each(function () {
      if ((themeSwitch.hasClass("red"))) {
        themeSwitch.removeClass("red");
      }
      if ((themeSwitch.hasClass("blue"))) {
        themeSwitch.removeClass("blue");
      }
      if ((themeSwitch.hasClass("green"))) {
        themeSwitch.removeClass("green");
      }
      if ((themeSwitch.hasClass("black"))) {
        themeSwitch.removeClass("black");
      }
      if ((themeSwitch.hasClass("grey"))) {
        themeSwitch.removeClass("grey");
      }
      themeSwitch.addClass(color);
    });
  }

  // Get the current theme for the current user
  function getTheme(user) {
    $.get(`/api/users/${user}`).then(function (data) {
      let userTheme = data.ThemeId; // current user Theme
      displayTheme(userTheme);
      return userTheme;
    });
  }



  // Get the current user name and id
  $.get("/api/user_data").then(function (data) {
    userName = data.name; // current username
    userId = data.id; // current user id
    $(".current-user").text(userName);
    console.log("First userId ", userId); //FOR TESTING
    themeId = getTheme(userId);
  });


  /**** Side Nav Menu ****/
  const slideMenu = document.querySelectorAll(".sidenav");
  M.Sidenav.init(slideMenu, {});

  // Dropdown listeners
  $("#dropdown1").click(e => {
    newTheme = e.target.firstChild.textContent;
    themeId = e.target.getAttributeNode("data-id").value;

    let updatingUser = {
      id: userId,
      ThemeId: themeId
    };
    console.log(updatingUser); // FOR TESTING
    // Update ThemeId for current user in users table
    $.post("/api/update", updatingUser).then((data) => {
      console.log(themeId);
      location.reload("dashboard");

    }).catch((err) => {
      console.log(JSON.stringify(err));
    });
  });


  /**** Statistics tabs ****/
  const stats = $(".tabs");
  M.Tabs.init(stats, {});
  // Get Random quote at loading page
  $.get("/api/quotes").then((data) => {
    let quote;
    quote = data[Math.floor(Math.random() * data.length)];
    $("#new-quote").text(quote.body);
    $("#author").text(`— ${quote.author}`);
  }).catch((err) => {
    console.log(JSON.stringify(err));
  });

  /**** Modal New Entry ****/
  const newEntryWindow = document.querySelector(".modal");
  M.Modal.init(newEntryWindow, {});


  // Dropdown for sorting all entries
  const sortBy = document.querySelector("select");
  M.FormSelect.init(sortBy, {});


  // Collapsible for all entries
  const displayNew = document.querySelector(".collapsible");
  M.Collapsible.init(displayNew, {});



  // Select menu for changing the theme
  var elems = document.querySelectorAll("select");
  // var instances = M.FormSelect.init(elems, options);

  const postmoodactivity = document.getElementById("createform");

  if (postmoodactivity) {
    postmoodactivity.addEventListener("submit", (e) => {
      e.preventDefault();

      const moodSelected = document.querySelectorAll("input[name=\"moodgroup\"]");
      const activitySelected = document.querySelectorAll("input[name=\"activitygroup\"]");
      let moodValue;
      let activityValue;
      for (const moodSelect of moodSelected) {
        if (moodSelect.checked) {
          moodValue = moodSelect.value;
          break;
        }
      }
      for (const activityselect of activitySelected) {

        if (activityselect.checked) {
          activityValue = activityselect.value;
          break;
        }
      }




      const newUserData = {
        moodId: moodValue,
        activityId: activityValue,
        userId: userId,

      };

      fetch("/api/userdata", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newUserData),
      }).then((response) => {


        location.reload();
      });

    });
  }



});
