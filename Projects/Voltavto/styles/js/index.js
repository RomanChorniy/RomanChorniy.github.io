$(document).ready(function () {
    $('.marks__slider').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        prevArrow: "<img src='image/prev.svg' class='prev' alt='prev arrow'>",
        nextArrow: "<img src='image/next.svg' class='next' alt='next arrow'>",
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 390,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.reviews__slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: "<img src='image/prev.svg' class='prev' alt='prev arrow'>",
        nextArrow: "<img src='image/next.svg' class='next' alt='next arrow'>",
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.imageBox__slider_big').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.imageBox__slider_small',
        dots: false,
    });
    $('.imageBox__slider_small').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.imageBox__slider_big',
        dots: false,
        arrows: false
    });
    $(function () {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 300,
            values: [25, 275],
            slide: function (event, ui) {
                $(".range__start_input").val(ui.values[0] + " 000");
                $(".range__end_input").val(ui.values[1] + " 000");
            }
        });
        $(".range__start_input").val($("#slider-range").slider("values", 0) + " 000");
        $(".range__end_input").val($("#slider-range").slider("values", 1) + " 000");
    });
    $(".statusClouse").click(function () {
        $(".leftBar").removeClass('closeBar');
        console.log("1")
    });
    $(".statusOpen").click(function () {
        $(".leftBar").addClass('closeBar');
    });
});