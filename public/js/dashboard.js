/* eslint-disable no-unused-vars */
$(document).ready(function () {
  let userName, themeName;
  let userId, themeId;
  let userData = [];

  M.AutoInit(); // Initiate dropdown


  // Function to change color class based on the themeId
  function displayTheme(theme) {
    const themeSwitch = $(".theme-switch");
    const themeText = $(".theme-text");
    let color;
    switch (theme) {
    case 2: color = "dark";
      break;
    case 3: color = "red";
      break;
    case 4: color = "blue";
      break;
    case 5: color = "green";
      break;
    default: color = "light";
    }
    // Change background color
    themeSwitch.each(function (){
      if((themeSwitch.hasClass("red"))){
        themeSwitch.removeClass("red");
      }
      if((themeSwitch.hasClass("blue"))){
        themeSwitch.removeClass("blue");
      }
      if((themeSwitch.hasClass("green"))){
        themeSwitch.removeClass("green");
      }
      if((themeSwitch.hasClass("dark"))){
        themeSwitch.removeClass("dark");
      }
      if((themeSwitch.hasClass("light"))){
        themeSwitch.removeClass("light");
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
      if((themeText.hasClass("dark-text"))){
        themeText.removeClass("dark-text");
      }
      if((themeText.hasClass("light-text"))){
        themeText.removeClass("light-text");
      }
      themeText.addClass(`${color}-text`);
    });
  }


  // Get the current theme for the current user
  function getTheme(user){
    $.get(`/api/users/${user}`).then(function (data) {
      let userTheme = JSON.parse(data.Theme.id); // current user Theme
      console.log("userTheme", userTheme);
      displayTheme(userTheme);
      return userTheme;
    });
  }



  // Get the current user name and id
  $.get("/api/user_data").then(function (data) {
    userName = data.name; // current username
    userId= data.id; // current user id
    $(".current-user").text(userName);
    console.log("First userId ", userId); //FOR TESTING
    themeId= getTheme(userId);
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
      location.reload();
    }).catch((err) => {
      console.log(JSON.stringify(err));
    });
  });


  /**** Statistics tabs ****/
  const stats = $(".tabs");
  M.Tabs.init(stats, {});
  // Get Random quote at loading page
  $.get("/api/quotes").then( (data) => {
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
      // create new entries in userdata
      $.post("/api/userdata", newUserData).then((response) => {
        location.reload();
      }).catch((err) => {
        console.log(JSON.stringify(err));
      });
    });
  }



});
