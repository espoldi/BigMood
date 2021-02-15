var instance = M.Sidenav.getInstance(elem);

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
});

document.getElementsByClassName('Sidenav-trigger').addEventListener('click', function () {
    instance.open();
});

document.getElementsByClassName('Sidenav-close').addEventListener('click', function () {
    instance.close();
});
