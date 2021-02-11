$(document).ready(function () {
    $('.marks__slider').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        prevArrow: "<img src='image/prev.svg' class='prev' alt='prev arrow'>",
        nextArrow: "<img src='image/next.svg' class='next' alt='next arrow'>"
    });
    $('.reviews__slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: "<img src='image/prev.svg' class='prev' alt='prev arrow'>",
        nextArrow: "<img src='image/next.svg' class='next' alt='next arrow'>"
    });
});