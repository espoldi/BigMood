/* eslint-disable default-case */
let id;
let color;
let userMoods = [], entryDates = [], datesIndex=[], avgMood=[];
let sundayTotal = 0, mondayTotal = 0, tuesdayTotal = 0,
  wednesdayTotal = 0, thursdayTotal = 0, fridayTotal = 0, saturdayTotal = 0,
  sundayCounter=0, mondayCounter=0, tuesdayCounter=0, wednesdayCounter=0,
  thursdayCounter=0, fridayCounter=0, saturdayCounter=0;

const weekdayArr= ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

// Get the current user name and id
$.get("/api/user_data").then((data) => {
  id = data.id; // current user id


  console.log(id);
  // Get data from API for the last 7 days
  $.get(`/api/userdata2/${id}`).then((res) => {
    let index; let date;

    // function to calculate the average
    function average(total, counter){
      let avg = 0;
      if (counter) {
        avg = total / counter;
      }
      return avg;
    }

    // Pushing result in differents arrays
    for (let i = 0; i < res.length; i++){
      userMoods.push(res[i].moodId); // Get all moodId for a user in the last 7 days
      date = res[i].updatedAt;
      index = new Date(date).getDay(); // Get the index of the week day
      entryDates.push(date);
      datesIndex.push(index);
    }
    console.log("moods: ", userMoods); //FOR TESTING
    console.log("Entrydates: ", entryDates); //FOR TESTING
    console.log("datesindex: ", datesIndex); //FOR TESTING

    for(let i = 0; i< datesIndex.length; i++){
      switch (datesIndex[i]) {
      case 0: sundayTotal +=userMoods[i];
        sundayCounter++;
        break;
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

    // Draw Chart
    var ctx = document.getElementById("chart").getContext("2d");
    function myChart(labelX, labelY, data, color){
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

    myChart(arrayX, arrayY, avgMood, color);

  });
});