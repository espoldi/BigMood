var instance = M.Sidenav.getInstance(elem);

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
});

// Listener to open Side Nav
document.getElementsByClassName('Sidenav-trigger').addEventListener('click', function () {
    instance.open();
});

// Listener to close Side Nav
document.getElementsByClassName('Sidenav-close').addEventListener('click', function () {
    instance.close();
});
