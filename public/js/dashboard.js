/* eslint-disable no-unused-vars */
$(document).ready(function () {
  let userName;
  let userId, themeId, newTheme;

  /*** Materialize items activation ***/
  // Side Nav Menu
  const slideMenu = $(".sidenav");
  M.Sidenav.init(slideMenu, {});

  // Initiate dropdown
  M.AutoInit();

  // Tabs for statistics
  const stats = $(".tabs");
  M.Tabs.init(stats, {});

  // Dropdown for sorting all entries
  const sortBy = $("select");
  M.FormSelect.init(sortBy, {});

  // Collapsible for all entries
  const displayNew = $(".collapsible");
  M.Collapsible.init(displayNew, {});

  // Modal for new entry
  const newEntryWindow = $(".modal");
  M.Modal.init(newEntryWindow, {});


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

  // Function to draw the chart
  function drawChart(labelX, labelY, data, color){
    let ctx = document.getElementById("chart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labelX,
        datasets: [{
          label: labelY,
          data: data,
          backgroundColor: color
        }]
      },
      options: {
        title: {
          display: false,
          text: "Average weekly mood"
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            gridLines: {
              drawOnChartArea: false
            },
            ticks: {
              max: 5,
              min: 0,
              stepSize: 1,
              display: false
            }
          }]
        }
      }
    });
  }

// Fo get the data to draw the chart
  function statChart(id, color){
    let userMoods = [], entryDates = [], datesIndex=[], avgMood=[];
    let sundayTotal = 0, mondayTotal = 0, tuesdayTotal = 0,
      wednesdayTotal = 0, thursdayTotal = 0, fridayTotal = 0, saturdayTotal = 0,
      sundayCounter=0, mondayCounter=0, tuesdayCounter=0, wednesdayCounter=0,
      thursdayCounter=0, fridayCounter=0, saturdayCounter=0;
    const weekdayArr= ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

    // Get data from API for the last 7 days
    $.get(`/api/userdata2/${id}`).then((res) => {
      let index; let date;

      // Pushing result in differents arrays
      for (let i = 0; i < res.length; i++){
        userMoods.push(res[i].moodId); // Get all moodId for a user in the last 7 days
        date = res[i].updatedAt;
        index = new Date(date).getDay(); // Get the index of the week day
        entryDates.push(date);
        datesIndex.push(index);
        console.log(userMoods);
      }
      console.log("moods: ", userMoods); //FOR TESTING
      console.log("Entrydates: ", entryDates); //FOR TESTING
      console.log("datesindex: ", datesIndex); //FOR TESTING

      for(let i = 0; i< datesIndex.length; i++){
        switch (datesIndex[i]) {
        case 1: mondayTotal +=userMoods[i];
          mondayCounter++;
          break;
        case 2: tuesdayTotal +=userMoods[i];
          tuesdayCounter++;
          break;
        case 3: wednesdayTotal +=userMoods[i];
          wednesdayCounter++;
          break;
        case 4: thursdayTotal +=userMoods[i];
          thursdayCounter++;
          break;
        case 5: fridayTotal +=userMoods[i];
          fridayCounter++;
          break;
        case 6: saturdayTotal +=userMoods[i];
          saturdayCounter++;
          break;
        default: sundayTotal +=userMoods[i]; // Case 0
          sundayCounter++;
          break;
        }
      }
      console.log("total", tuesdayTotal ); //FOR TESTING
      console.log("total", tuesdayCounter); //FOR TESTING
      // Populate average mood/day
      avgMood.push(average(sundayTotal, sundayCounter));
      avgMood.push(average(mondayTotal, mondayCounter));
      avgMood.push(average(tuesdayTotal, tuesdayCounter));
      avgMood.push(average(wednesdayTotal, wednesdayCounter));
      avgMood.push(average(thursdayTotal, thursdayCounter));
      avgMood.push(average(fridayTotal, fridayCounter));
      avgMood.push(average(saturdayTotal, saturdayCounter));

      console.log("final array", avgMood); // FOR TESTING

      // Find today's day:
      const today = new Date();
      const todayIndex = today.getDay();
      console.log("today ", today); // FOR TESTING
      console.log("todayindex ", todayIndex); // FOR TESTING

      /***TO DO: REODER ARRAY BASE OF TODAY AS LAST ARRAY INDEX ***/

      /***TO DO: BUILD DYNAMIC ARRAY WITH LAST INDEX BEING TODAY'S DAY ***/
      let arrayX= ["M", "T", "W", "T", "F", "S", "S"];

      // Temporary hardcoded data for Yaxis
      let arrayY = [
        "<i class=\"material-icons\"> </i>",
        "<i class=\"material-icons\">sentiment_very_dissatisfied</i>",
        "<i class=\"material-icons\">sentiment_dissatisfied</i>",
        "<i class=\"material-icons\">sentiment_neutral</i>",
        "<i class=\"material-icons\">sentiment_satisfied</i>",
        "<i class=\"material-icons\">sentiment_very_satisfied</i>"

      ];
      
      drawChart(arrayX, arrayY, avgMood, color); // Draw the chart

    });

  }


  // Function to get the most commonly found in an array
  function commonlyUsed(arr){
    return arr.sort((a,b) =>
      arr.filter(v => v===a).length
      - arr.filter(v => v===b).length
    ).pop();
  }

  //Function to calculate the average
  function average(total, counter){
    let avg = 0;
    if (counter) {
      avg = total / counter;
    }
    return avg;
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
    }).catch((error) => {
      console.log(JSON.stringify(error));
    });
  }

  // Function to create new entries
  function newEntry(id){
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
          userId: id
        };
        // create new entries in userdata table
        $.post("/api/userdata", newUserData).then((response) => {
          location.reload();
        }).catch((error) => {
          console.log(JSON.stringify(error));
        });
      });
    }
  }

  // Get the current user name and id and render all dependencies
  $.get("/api/user_data").then(function (data) {
    userName = data.name; // current username
    userId = data.id; // current user id
    $(".current-user").text(userName);
    themeId = getTheme(userId);
    MoodsActivities(userId);
    newEntry(userId);
    let themeName = sessionStorage.getItem("color");
    statChart(userId, themeName);
  });

  // Dropdown listeners
  $("#dropdown1").click(e => {
    newTheme = e.target.firstChild.textContent;
    themeId = e.target.getAttributeNode("data-id").value;
    let updatingUser = {
      id: userId,
      ThemeId: themeId
    };
    // Update ThemeId for current user in users table
    $.post("/api/update", updatingUser).then((data) => {
      location.reload();
    }).catch((error) => {
      console.log(JSON.stringify(error));
    });
  });

  // Get Random quote at loading page
  $.get("/api/quotes").then((data) => {
    let quote;
    quote = data[Math.floor(Math.random() * data.length)];
    $("#new-quote").text(quote.body);
    $("#author").text(`— ${quote.author}`);
  }).catch((error) => {
    console.log(JSON.stringify(error));
  });

});
