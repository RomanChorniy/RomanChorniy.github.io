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
    // $('.menuWindowContainer__accordionMenu .accordionMenu__item').click(function () {
    //     var head = $(this);

    //     // remove any active head
    //     head.siblings('.accordionMenu__item').removeClass('active');

    //     var section = head.next('.section');
    //     //remove .section to exclude from hide all
    //     section.removeClass('section');

    //     //hide sibling sections
    //     head.siblings('.section').hide();

    //     // set .section class back
    //     section.addClass('section');

    //     if (!section.css(':visible')) {
    //         // set as active and show section
    //         head.addClass('active');
    //         section.fadeIn(500);
    //         $('.accordionMenu__item_icon').removeClass('clouseIcon');
    //     };
    // });
    $('.menuWindowContainer__accordionMenu .accordionMenu__item').click(function () {
        var myThis = $(this);
        myThis.toggleClass('active');
        myThis.next().toggleClass('d-block');
    });
    $('.menuBar__menuBtn').click(function () {
        $('.menuWindow').addClass('menuWindow_open');
    });
    $('.exitBox').click(function () {
        $('.menuWindow').removeClass('menuWindow_open');
    });
});