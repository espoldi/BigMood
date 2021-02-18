// Side Nav Menu
const slideMenu = document.querySelectorAll(".sidenav");
M.Sidenav.init(slideMenu, {});

// Modal New Entry
document.addEventListener("DOMContentLoaded", function() {
    const newEntryWindow = document.querySelector(".modal");
    M.Modal.init(newEntryWindow, {});
});

// Dropdown for sorting all entries
const sortBy = document.querySelector(".dropdown-trigger");
M.Dropdown.init(sortBy, {});

// Collapsible for all entries
document.addEventListener("DOMContentLoaded", function() {
    const displayNew = document.querySelector(".collapsible");
    M.Collapsible.init(displayNew, {});
});