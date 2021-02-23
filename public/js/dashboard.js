/* eslint-disable no-unused-vars */
$(document).ready(function () {
  let userName;
  let userId, themeId, newTheme;


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

  // Function to get the most commonly found in an array
  function commonlyUsed(arr){
    return arr.sort((a,b) =>
      arr.filter(v => v===a).length
      - arr.filter(v => v===b).length
    ).pop();
  }

  // Function to get all moods average and most used activities
  function MoodsActivities(id){
    $.get(`/api/userdata/${id}`).then((data) => {
      let userMoods = [], userActivities = [];
      let moodAvgIcon, moodAvgName;

      // Pushing result in differents arrays
      for (let i = 0; i < data.length; i++){
        userMoods.push(data[i].moodId); // Get all moodId for a user
        userActivities.push(data[i].Activity.name); // Get all activities for a user
      }
      // Getting the average mood
      let total = 0;
      for (let i = 0; i < userMoods.length; i++) {
        total += userMoods[i];
      }
      let moodAvg= Math.round(total/userMoods.length);

      // Finding the matching icon and name for the mood average
      switch (moodAvg) {
      case 1: moodAvgName = "excited";
        moodAvgIcon = "sentiment_very_satisfied";
        break;
      case 2: moodAvgName = "happy";
        moodAvgIcon = "sentiment_satisfied";
        break;
      case 3: moodAvgName = "neutral";
        moodAvgIcon = "sentiment_neutral";
        break;
      case 4: moodAvgName = "sad";
        moodAvgIcon = "sentiment_dissatisfied";
        break;
      default: moodAvgName = "breakdown";
        moodAvgIcon = "sentiment_very_dissatisfied";
      }
      $("#fav-mood").text(moodAvgIcon); // Display icon
      $("#my-mood").text(moodAvgName); // Display name

      // Getting the most common activity
      let myActivity= commonlyUsed(userActivities);
      $("#fav-activity").text(myActivity); // Display icon
      $("#my-activity").text(myActivity); // Display name
    }).catch((err) => {
      console.log(JSON.stringify(err));
    });
  }



  // Get the current user name and id
  $.get("/api/user_data").then(function (data) {
    userName = data.name; // current username
    userId = data.id; // current user id
    $(".current-user").text(userName);
    themeId = getTheme(userId);
    MoodsActivities(userId);
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
  $.get("/api/quotes").then((data) => {
    let quote;
    quote = data[Math.floor(Math.random() * data.length)];
    $("#new-quote").text(quote.body);
    $("#author").text(`— ${quote.author}`);
  }).catch((err) => {
    console.log(JSON.stringify(err));
  });




  // Dropdown for sorting all entries
  const sortBy = $("select");
  M.FormSelect.init(sortBy, {});


  // Collapsible for all entries
  const displayNew = $(".collapsible");
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
        moodId: moodValue,
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
