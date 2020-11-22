$(document).ready(function () {
    $('.menuBar__telephoneBtn').click(function () {
        $('.telephoneWindow').addClass('telephoneWindow_openStatus');
        $('.searchWindow').removeClass('searchWindow_openStatus');
    });
    $(".telephoneWindow__closeBtn").click(function () {
        $('.telephoneWindow').removeClass('telephoneWindow_openStatus');
    });
    $('.menuBar__searchBtn').click(function () {
        if ($('.searchWindow').hasClass('searchWindow_openStatus')) $('.searchWindow').removeClass('searchWindow_openStatus')
        else $('.searchWindow').addClass('searchWindow_openStatus');
        $('.telephoneWindow').removeClass('telephoneWindow_openStatus');
    });
});