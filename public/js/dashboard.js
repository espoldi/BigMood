// Side Nav Menu
const slideMenu = document.querySelectorAll(".slidenav");
M.Sidenav.init(slideMenu, {});



// Modal New Entry
var instance = M.Modal.getInstance(elem);

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  });

// Listener for Add Entry button
document.getElementsById('addNew').addEventListener('click', function () {
    instance.open();
});