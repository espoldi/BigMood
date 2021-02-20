// Side Nav Menu
const slideMenu = document.querySelectorAll(".sidenav");
M.Sidenav.init(slideMenu, {});

// Statistics tabs
$(document).ready(function () {
  const stats = $(".tabs");
  M.Tabs.init(stats, {});
  // Get Random quote at loading page
  $.get("/api/quotes").then(function(data) {
    let quote;
    quote = data[Math.floor(Math.random() * data.length)];
    $("#new-quote").text(quote.body);
    $("#author").text(`— ${quote.author}`);
  }).catch((err) => {
    console.log(JSON.stringify(err));
  });
});

// Modal New Entry
document.addEventListener("DOMContentLoaded", function() {
  const newEntryWindow = document.querySelector(".modal");
  M.Modal.init(newEntryWindow, {});
});

// Dropdown for sorting all entries
document.addEventListener("DOMContentLoaded", function() {
  const sortBy = document.querySelector("select");
  M.FormSelect.init(sortBy, {});
});

// Collapsible for all entries
document.addEventListener("DOMContentLoaded", function() {
  const displayNew = document.querySelector(".collapsible");
  M.Collapsible.init(displayNew, {});
});