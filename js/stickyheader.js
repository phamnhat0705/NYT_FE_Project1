$(function() {

    var stickyHeaderTop = $('.stickyheader').offset().top;

    $(window).scroll(function() {

        if ($(window).scrollTop() > stickyHeaderTop) {

            $('.stickyheader').css({
                position: 'fixed',
                top: '0px'
            });
            $('.logo-inline').css({
                display: 'block'
            });

        } else {

            $('.stickyheader').css({
                position: 'static',
                top: '0px'
            });
            $('.logo-inline').css({
                display: 'none'
            });

        }

    });

});

$(function($){
    var offset = 700,
        offset_home = 120,
        $panel_lock = $('.panel-lock');
        $panel_home_lock = $('.panel-home-lock');
    //hide or show the "panel-lock"
    $(window).scroll(function(){
        ( $(this).scrollTop() > offset ) ? $panel_lock.addClass('panel-lock-is-visible') : $panel_lock.removeClass('panel-lock-is-visible');
        ( $(this).scrollTop() > offset_home) ? $panel_home_lock.addClass('panel-home-locked') : $panel_home_lock.removeClass('panel-home-locked');
    });
});