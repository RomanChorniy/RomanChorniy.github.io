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

    $('.accordion-button').click(function () {
        console.log($(this).parent().next());
        if ($(this).hasClass('collapsed')) ($(this).parent().next().removeClass('show'))
        else ($(this).parent().next().addClass('show'));
        console.log('my code1');
    });

    // shop_IP

    //slick slider
    $(document).ready(function () {
        $('.imageBox__slider_big').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.imageBox__slider_small',
            dots: false,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        dots: true
                    }
                }
            ]
        });
        $('.imageBox__slider_small').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.imageBox__slider_big',
            dots: false,
            prevArrow: "<img src='image/arrow_prev.png' class='prev' alt='1'>",
            nextArrow: "<img src='image/arrow_next.png' class='next' alt='2'>",
            centerMode: true,
            focusOnSelect: true
        });
        $('.vuSmotreli__table').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: false,
            nextArrow: "<img src='image/arrow_next.png' class='next' alt='2'>",
            centerMode: false,
            variableWidth: true,
            focusOnSelect: false,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    }
                }
            ]
        });
    });
    //Form kilkist arrow
    $('.kilkist__btnDown').click(function () {
        let a = $('.kilkist').val();
        if (a > 1) a--
        $('.kilkist').val(a);
    });
    $('.kilkist__btnUp').click(function () {
        let a = $('.kilkist').val();
        if (a < 99) a++
        $('.kilkist').val(a);
    });
});