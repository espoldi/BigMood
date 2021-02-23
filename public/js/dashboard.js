/* eslint-disable no-unused-vars */
$(document).ready(function () {
  let userName;
  let userId, themeId;
  let userData = [];

  M.AutoInit(); // Initiate dropdown


  // Function to change color class based on the themeId
  function displayTheme(theme) {
    const themeSwitch = $(".theme-switch");
    const themeText = $(".theme-text");
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

    // Change text color
    themeText.each(function() {
      if((themeText.hasClass("red-text"))){
        themeText.removeClass("red-text");
      }
      if((themeText.hasClass("blue-text"))){
        themeText.removeClass("blue-text");
      }
      if((themeText.hasClass("green-text"))){
        themeText.removeClass("green-text");
      }
      if((themeText.hasClass("black-text"))){
        themeText.removeClass("black-text");
      }
      if ((themeText.hasClass("grey-text"))) {
        themeText.removeClass("grey-text");
      }
      themeText.addClass(`${color}-text`);
    });
  }


  // Get the current theme for the current user
  function getTheme(user) {
    $.get(`/api/users/${user}`).then(function (data) {
      let userTheme = data.Theme.id; // current user Theme
      let themeName = data.Theme.name; // current Theme name
      sessionStorage.setItem("color", themeName); // Store to session for graph
      displayTheme(userTheme);
      return userTheme;
    });
  }



  // Get the current user name and id
  $.get("/api/user_data").then(function (data) {
    userName = data.name; // current username
    userId = data.id; // current user id
    $(".current-user").text(userName);
    themeId = getTheme(userId);
  });


  /**** Side Nav Menu ****/
  const slideMenu = document.querySelectorAll(".sidenav");
  M.Sidenav.init(slideMenu, {});

  // Dropdown listeners
  $("#dropdown1").click(e => {
    newTheme = e.target.firstChild.textContent;
    themeId = e.target.getAttributeNode("data-id").value;
    sessionStorage.setItem("color", newTheme); // Store to session for graph
    let updatingUser = {
      id: userId,
      ThemeId: themeId
    };
    console.log(updatingUser); // FOR TESTING
    // Update ThemeId for current user in users table
    $.post("/api/update", updatingUser).then((data) => {
      location.reload();
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




  // Dropdown for sorting all entries
  const sortBy = document.querySelector("select");
  M.FormSelect.init(sortBy, {});


  // Collapsible for all entries
  const displayNew = document.querySelector(".collapsible");
  M.Collapsible.init(displayNew, {});

  /**** Modal New Entry ****/
  const newEntryWindow = $(".modal");
  M.Modal.init(newEntryWindow, {});

  const postmoodactivity = $("#createform");
  if (postmoodactivity) {
    postmoodactivity.on("submit", (event) => {
      event.preventDefault();
      const moodSelected = $("input[name=\"moodgroup\"]");
      const activitySelected = $("input[name=\"activitygroup\"]");
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
        MoodId: moodValue,
        activityId: activityValue,
        userId: userId
      };
      // create new entries in userdata table
      $.post("/api/userdata", newUserData).then((response) => {
        location.reload();
      }).catch((err) => {
        console.log(JSON.stringify(err));
      });
    });
  }

});
