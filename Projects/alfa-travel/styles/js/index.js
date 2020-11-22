$(document).ready(function () {
    $('.menuBar__telephoneBtn').click(function () {
        $('.telephoneWindow').addClass('telephoneWindow_openStatus');
    });
    $(".telephoneWindow__closeBtn").click(function () {
        $('.telephoneWindow').removeClass('telephoneWindow_openStatus');
    });
});