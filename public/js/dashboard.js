// Side Nav Menu
const slideMenu = document.querySelectorAll(".sidenav");
M.Sidenav.init(slideMenu, {});

// Statistics tabs
document.addEventListener("DOMContentLoaded", function () {
    const stats = document.querySelector(".tabs");
    M.Tabs.init(stats, {});
});

// Modal New Entry
document.addEventListener("DOMContentLoaded", function (event) {
    const newEntryWindow = document.querySelector(".modal");
    M.Modal.init(newEntryWindow, {});


});



// Dropdown for sorting all entries
document.addEventListener("DOMContentLoaded", function () {
    const sortBy = document.querySelector("select");
    M.FormSelect.init(sortBy, {});
});

// Collapsible for all entries
document.addEventListener("DOMContentLoaded", function () {
    const displayNew = document.querySelector(".collapsible");
    M.Collapsible.init(displayNew, {});
});


fetch("/api/activities", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
    .then(response => response.json())
    .then(data => console.log(data));



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