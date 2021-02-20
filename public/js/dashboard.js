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

  // Dropdown listeners
  $("#dropdown2").click(e => {
    newColor = e.target.firstChild.textContent;
  });

  // Select menu for changing the theme
  // const elems = document.querySelectorAll("select");
  // const instances = M.FormSelect.init(elems, options);

  // $("input-field.value").on("change", function () {
  //   console.log($(this).val());
  // });

  // $(".theme.value").click(function () {
  //   console.log($(this).val());
  //   // console.log("Theme Selected");
  // });

  // $(".theme").click(e => {

  // });

  // import { MDCSelect } from '@material/select';

  // const select = new MDCSelect(document.querySelector('.mdc-select'));

  // select.listen('MDCSelect:change', () => {
  //   alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
  // });


  // $(".darkTheme").click(function () {
  //   console.log("Dark Theme Selected");
  // });
  // $(".lightTheme").click(function () {
  //   console.log("Light Theme Selected");
  // });
  // $(".lightTheme").click(function () {
  //   console.log("Light Theme Selected");
  // });
  // $(".lightTheme").click(function () {
  //   console.log("Light Theme Selected");
  // });
  // $(".lightTheme").click(function () {
  //   console.log("Light Theme Selected");
  // });


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