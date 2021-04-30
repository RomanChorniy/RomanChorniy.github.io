(function ($) {

    $(function () {
        fancyboxInit();
        dropdownMenu();
        sliderFooterInit();
        buttonSignaturesImagesInit();
        slowScroll();
        cartCountInit();
        shopSeeMoreComponent5();

        window.lazyLoadOptions = new LazyLoad({
            elements_selector: ".lazy"
        });
    });

    function fancyboxInit() {
        $('.fancybox-link, .shop-template .fancybox').fancybox({
            touch: false
        });
        $('.fancybox-link-slider').fancybox({
            touch: false,
            selector: '.slick-slide:not(.slick-cloned)',
            hash: false
        });
        $('.fancybox-img-without-link').each(function () {
            $(this).fancybox({
                touch: false,
                href: $(this).attr('src')
            });
        });
        $('.fancybox-video-youtube').fancybox({
            type: "iframe",
            width: 800,
            height: 400
        });
    }

    function dropdownMenu() {
        var dropdown = $('.nav-item.dropdown');
        var dropdownToggle = $('.nav-link.dropdown-toggle');
        var navItemDropdown = '.nav-item.dropdown';
        var dropdownMenu = '.dropdown-menu';
        $('.nav-link', navItemDropdown).on('touchstart', function (e) {
            $(this).parent(navItemDropdown).toggleClass('show');
            $(this).siblings(dropdownMenu).toggleClass('show');
        });

        $(dropdownToggle, dropdown).hover(function () {
            $(this).parent(navItemDropdown).addClass('show');
            $(this).siblings(dropdownMenu).addClass('show');
        });

        dropdown.mouseleave(function () {
            $(dropdownToggle, this).parent(navItemDropdown).removeClass('show');
            $(dropdownToggle, this).siblings(dropdownMenu).removeClass('show');
        });

        $('button.navbar-toggler').on('click', function () {
            var idMenu = $(this).data('target');
            var menu = $(idMenu);
            if (menu.first().is(':hidden')) {
                menu.show('slow');
            } else {
                menu.slideUp();
            }
        });
    }

    function sliderFooterInit() {
        var pfbReviewsSlider = $('.slider-footer-wrapper');
        if (pfbReviewsSlider.length) {
            pfbReviewsSlider.slick({
                arrows: true,
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                prevArrow: $('.slider-arrows .slider-arrow-prev'),
                nextArrow: $('.slider-arrows .slider-arrow-next'),
                lazyLoad: 'progressive',
                responsive: [
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }
    }

    function buttonSignaturesImagesInit() {
        var signatureImageWrap = $('.component-with-button');
        if (signatureImageWrap.length) {
            signatureImageWrap.each(function () {
                var thisSignatureImage = $(this);
                $('.component-button', thisSignatureImage).on('click', function () {
                    var thisSignatureImageButton = $(this);
                    var countViewWhenClickOnButton = thisSignatureImageButton.data('count-view-when-click-on-button');
                    if (countViewWhenClickOnButton) {
                        $(thisSignatureImage).find('.hide-block').slice(0, countViewWhenClickOnButton).removeClass('hide-block');
                    } else {
                        $(thisSignatureImage).find('.hide-block').removeClass('hide-block');
                    }
                    if ($(thisSignatureImage).find('.hide-block').length === 0) {
                        thisSignatureImageButton.hide();
                    }

                    if (thisSignatureImage.hasClass('slider')) {
                        $('.slider-wrapper', thisSignatureImage).slick('refresh');
                    }
                });
            });
        }
    }

    function slowScroll() {
        $('a').on('click', function (e) {
            var thisButton = $(this);
            if (thisButton.data('scroll') != 'disable') {
                var href = thisButton.attr('href');
                if (href) {
                    var splitHref = href.split('#');
                    if ((splitHref[0] == '') && (splitHref[1] != '')) {
                        e.preventDefault();
                        var component = $('#' + splitHref[1]);
                        if (component.length) {
                            window.lazyLoadOptions.destroy();
                            var componentOffset = Math.round(component.offset().top - 65);
                            $('html, body').animate({
                                scrollTop: componentOffset
                            }, 300, function () {
                                window.lazyLoadOptions = new LazyLoad({
                                    elements_selector: ".lazy"
                                });
                            });
                        }
                    }
                }
            }
        });
    }

    function cartCountInit() {
        var wrapper = $('#shop-cart');
        if (wrapper.length) {
            var wrapperCount = $('.wrapper-count', wrapper);
            var count = $('.count', wrapperCount);
            var absoluteBeforePrice = $('.absolute-before-price', wrapper);
            var absoluteAfterPrice = $('.absolute-after-price', wrapper);
            var beforePrice = $('.price .price-before span', wrapper);
            var afterPrice = $('.price .price-after span', wrapper);
            var finallyPrice = $('.title .price span', wrapper);
            var formCount = $('.form input[name="count"]', wrapper);
            var formPrice = $('.form input[name="price"]', wrapper);
            var minusButton = $('.minus', wrapperCount);

            minusButton.on('click', function () {
                if (count.text() != '1') {
                    var finallyCount = +count.text() - 1;
                    count.html(finallyCount);

                    var finallyBeforePrice = absoluteBeforePrice.text().replace(' ', '');
                    finallyBeforePrice = finallyBeforePrice.replace(/\u00A0/g, '');
                    finallyBeforePrice = finallyBeforePrice * finallyCount;
                    beforePrice.html(new Intl.NumberFormat('ru-RU').format(finallyBeforePrice));

                    var finallyAfterPrice = absoluteAfterPrice.text().replace(' ', '');
                    finallyAfterPrice = finallyAfterPrice.replace(/\u00A0/g, '');
                    finallyAfterPrice = finallyAfterPrice * finallyCount;
                    afterPrice.html(new Intl.NumberFormat('ru-RU').format(finallyAfterPrice));
                    finallyPrice.html(new Intl.NumberFormat('ru-RU').format(finallyAfterPrice));

                    if (finallyCount == 1) {
                        minusButton.addClass('not-active');
                    }

                    formCount.val(finallyCount);
                    formPrice.val(finallyAfterPrice);
                }
            });

            $('.plus', wrapperCount).on('click', function () {
                var finallyCount = +count.text() + 1;
                count.html(finallyCount);

                var finallyBeforePrice = absoluteBeforePrice.text().replace(' ', '');
                finallyBeforePrice = finallyBeforePrice.replace(/\u00A0/g, '');
                finallyBeforePrice = finallyBeforePrice * finallyCount;
                beforePrice.html(new Intl.NumberFormat('ru-RU').format(finallyBeforePrice));

                var finallyAfterPrice = absoluteAfterPrice.text().replace(' ', '');
                finallyAfterPrice = finallyAfterPrice.replace(/\u00A0/g, '');
                finallyAfterPrice = finallyAfterPrice * finallyCount;
                afterPrice.html(new Intl.NumberFormat('ru-RU').format(finallyAfterPrice));
                finallyPrice.html(new Intl.NumberFormat('ru-RU').format(finallyAfterPrice));

                minusButton.removeClass('not-active');

                formCount.val(finallyCount);
                formPrice.val(finallyAfterPrice);
            });
        }
    }

    function shopSeeMoreComponent5() {
        var wrapper = $('#shop-main .component-5');
        if (wrapper.length) {
            var seeMore = $('.see-more', wrapper);
            seeMore.on('click', function (e) {
                wrapper.find('.col-sm-6').removeClass('d-none');
                seeMore.remove();
            });
        }
    }

})(jQuery);