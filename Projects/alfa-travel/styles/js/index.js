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
    $('.languageBox').click(function () {
        if ($('.secondLangItem').hasClass('openBlock'))
            $('.secondLangItem').removeClass('openBlock');
        else
            $('.secondLangItem').addClass('openBlock');
        if ($('.secondLangItem').hasClass('openBlock')) $('.languageBox__indicator').addClass('rotateIndecator')
        else $('.languageBox__indicator').removeClass('rotateIndecator')
    });
});