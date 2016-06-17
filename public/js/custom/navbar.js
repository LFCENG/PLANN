(function () {
    var hash = window.location.hash;
    var index = hash.length;
    if (hash.indexOf('/', 2) == -1) (index = hash.length);
    var href = hash.substr(0, index);
    $('#navbar li a[href="' + href + '"]').parent().addClass('active');
    $('#navbar li').click(function(el) {
        $('#navbar li').removeClass('active');
        $(this).addClass('active');
    });
    
})();
