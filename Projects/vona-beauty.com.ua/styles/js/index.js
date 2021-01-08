$(document).ready(function () {
    $('.nameTovaryBtn').click(function () {
        $('.priceBtn').removeClass('vubranaBtn');
        $('.nameTovaryBtn').addClass('vubranaBtn');
    });
    $('.priceBtn').click(function () {
        $('.nameTovaryBtn').removeClass('vubranaBtn');
        $('.priceBtn').addClass('vubranaBtn');
    });
    $('.arrow_down').click(function () {
        $('.arrow_up').removeClass('vubranaArrow');
        $('.arrow_down').addClass('vubranaArrow');
    });
    $('.arrow_up').click(function () {
        $('.arrow_down').removeClass('vubranaArrow');
        $('.arrow_up').addClass('vubranaArrow');
    });

    $('.burgerMenu__lines').click(function () {
        $('.burgerWindow').addClass('open');
        if (window.screen.width > 575) $('body').css('overflow', 'hidden');
    });
    $('.btn-close').click(function () {
        $('.burgerWindow').removeClass('open');
        $('body').css('overflow', 'visible');
    });

    $('.filtruBtn').click(function () {
        $('.sortMenu').addClass('open');
    });
    $('.btn-close').click(function () {
        $('.sortMenu').removeClass('open');
    });
});