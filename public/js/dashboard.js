$(document).ready(function () {
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
  // var elems = document.querySelectorAll("select");
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




});