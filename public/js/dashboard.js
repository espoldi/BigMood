$(document).ready(function () {
    let userName;
    let userId;
    let userData = [];

    // Get the current user name and id
    $.get("/api/user_data").then(function (data) {
        userName = data.name; // current username
        userId = data.id; // current user id
        $(".current-user").text(userName);
    });

    // Get all previous data from current user
    $.get(`/api/userdata/${userId}`).then(function (data) {
        userData = data;
        console.log(userData); //FOR TESTING
    }).catch((err) => {
        console.log(JSON.stringify(err));
    });

    // Side Nav Menu
    const slideMenu = document.querySelectorAll(".sidenav");
    M.Sidenav.init(slideMenu, {});

    // Statistics tabs
    const stats = $(".tabs");
    M.Tabs.init(stats, {});
    // Get Random quote at loading page
    $.get("/api/quotes").then(function (data) {
        let quote;
        quote = data[Math.floor(Math.random() * data.length)];
        $("#new-quote").text(quote.body);
        $("#author").text(`— ${quote.author}`);
    }).catch((err) => {
        console.log(JSON.stringify(err));
    });

    // Modal New Entry
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


    // switch () {
    //   case :

    //     break;
    //   case :

    //     break;

    // }


    // const theme = $(".theme");
    // M.Theme.init(theme, {});
    // $.post("/api/update").then(function (data) {
    //   if (theme.classList.contains
    // });


    const postmoodactivity = document.getElementById("createform");

    if (postmoodactivity) {
        postmoodactivity.addEventListener("submit", (e) => {
            e.preventDefault();


            const newUserData = {
                moodId: document.querySelectorAll('input[name="moodgroup"]'),
                activityId: document.querySelectorAll('input[name="activitygroup"]'),
            };
            console.log(newUserData);

            fetch("/api/userdata", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(newUserData),
            }).then((response) => {


                console.log("Created a new user data!");
                location.reload();
            });
        });
    }

});