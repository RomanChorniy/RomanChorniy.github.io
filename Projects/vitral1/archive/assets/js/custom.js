var templateUrl = php_objects.templateUrl;

(function ($) {

    $(function () {
        fancyboxInit();
        buttonSignaturesImagesInit();
        sliderSlickInit();
        slowScroll();
        dropdownMenu();
        scrollToTop();
        fixedHeader();
        initContactFormConversion();
        initCustomReadMore();
        faqComponent();

        window.lazyLoadOptions = new LazyLoad({
            elements_selector: ".lazy"
        });
    });

    var slickArgs = {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        fade: true,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000,
        lazyLoad: 'progressive'
    };

    function faqComponent() {
        var wrapperFaq = $('.component .faq');
        if (wrapperFaq.length) {
            $('.wrapper-faq', wrapperFaq).on('click', function () {
                var myThis = $(this);
                myThis.toggleClass('active');
                $('.answer', myThis).toggleClass('d-none');
            });
        }
    }

    function initCustomReadMore() {
        var customReadMore = $('.custom-read-more');
        if (customReadMore.length) {
            $('.button-custom-read-more', customReadMore).on('click', function () {
                var myThis = $(this);
                myThis.siblings('.text').removeClass('d-none');
                myThis.addClass('d-none');
            });
        }
    }

    function initContactFormConversion() {
        $(".wpcf7").on('wpcf7mailsent', function (e) {
            window['dataLayer'].push({
                'event': 'gtm4wp.contactForm7Submitted'
            });
        });
    }

    function fixedHeader() {
        var wrapper = $('#header.fixed-header');
        if (wrapper.length) {
            function setMarginTopWrapper() {
                if ($(window).width() > 576) {
                    var heightTopHeader = $('.top-header', wrapper).height();
                    var navbarWrapper = $('.navbar-wrapper', wrapper);
                    var heightNavbarWrapper = navbarWrapper.height();
                    wrapper.addClass('fixed-header');
                    wrapper.css('padding-top', (heightTopHeader + heightNavbarWrapper) + 'px');
                    navbarWrapper.css('top', heightTopHeader + 'px');
                } else {
                    wrapper.removeClass('fixed-header');
                    wrapper.css('padding-top', '0');
                }
            }

            function checkNotLoadedImg() {
                setMarginTopWrapper();
                var hasLoaded = $('.top-header', wrapper).find('img.lazy').hasClass('loaded');
                var checkNotLoadedImgTimeout = setTimeout(checkNotLoadedImg, 20);
                if (hasLoaded) {
                    clearTimeout(checkNotLoadedImgTimeout);
                }
            }

            checkNotLoadedImg();
            window.addEventListener('resize', checkNotLoadedImg);
        }
    }

    function scrollToTop() {
        var btn = $('.scroll-top');
        if (btn.length) {
            $(window).scroll(function () {
                if ($(window).scrollTop() > 1000) {
                    btn.addClass('d-block');
                } else {
                    btn.removeClass('d-block');
                }
            });

            btn.on('click', function (e) {
                $('html, body').animate({ scrollTop: 0 });
            });
        }
    }

    function dropdownMenu() {
        var dropdown = $('.nav-item.dropdown');
        var dropdownToggle = $('.nav-link.dropdown-toggle');
        var navItemDropdown = '.nav-item.dropdown';
        var dropdownMenu = '.dropdown-menu';
        $('.dropdown-arrow', navItemDropdown).on('click', function (e) {
            $(this).parent(navItemDropdown).toggleClass('show');
            $(this).siblings(dropdownMenu).toggleClass('show');
        });

        function dropdownMenuMobile() {
            if ($(window).width() > 576) {
                $(dropdownToggle, dropdown).hover(function () {
                    $(this).parent(navItemDropdown).addClass('show');
                    $(this).siblings(dropdownMenu).addClass('show');
                });

                dropdown.mouseleave(function () {
                    $(dropdownToggle, this).parent(navItemDropdown).removeClass('show');
                    $(dropdownToggle, this).siblings(dropdownMenu).removeClass('show');
                });
            } else {
                $(dropdownToggle, dropdown).unbind();
                dropdown.unbind();
            }
        }

        dropdownMenuMobile();

        window.addEventListener('resize', dropdownMenuMobile);

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

    function sliderSlickInit() {
        var gallery = $('.slider-wrapper:not(.hide-slider, .image-desktop, .image-mobile)');
        if (gallery.length) {
            gallery.slick(slickArgs);
        }
        var adaptiveGalleryDesk = $('.slider-wrapper.image-desktop');
        var adaptiveGalleryMob = $('.slider-wrapper.image-mobile');
        if (adaptiveGalleryDesk.length && adaptiveGalleryMob.length) {
            function adaptiveGallery() {
                if ($(window).width() > 576) {
                    adaptiveGalleryDesk.not('.slick-initialized').slick(slickArgs);
                } else {
                    adaptiveGalleryMob.not('.slick-initialized').slick(slickArgs);
                }
            }

            adaptiveGallery();
            window.addEventListener('resize', adaptiveGallery);
        }
        var fullScreenSlider = $('.full-screen-slider');
        if (fullScreenSlider.length) {
            fullScreenSlider.each(function () {
                $('.wrapper-full-screen-slider', this).slick({
                    arrows: true,
                    dots: false,
                    infinite: true,
                    prevArrow: $('.prev', this),
                    nextArrow: $('.next', this),
                    slidesToShow: $('.count-in-row', this).text(),
                    slidesToScroll: 1,
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
                        $('.slider-wrapper:not(.slick-initialized)', thisSignatureImage).slick(slickArgs);
                    }
                });
            });
        }
    }

    function fancyboxInit() {
        $('.fancybox-link').fancybox({
            touch: false
        });

        $('.fancybox-img-without-link').each(function () {
            $(this).fancybox({
                touch: false,
                href: $(this).attr('src')
            });
        });
    }

    //Front-end script.

})(jQuery);
jQuery(document).ready(function () {
    jQuery('.menuBtn').on('click', function () {
        jQuery('.header__container').toggleClass('menu_open');
    });
    jQuery('.title__slider').slick({
        infinite: false,
        vertical: true,
        verticalSwiping: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        prevArrow: '<div class="slick-prev"><img src="assets/images/Arrow-down.svg" alt="prevArrow"></div>',
        nextArrow: '<div class="slick-next"><img src="assets/images/Arrow-down.svg" alt="nextArrow"></div>',
        responsive: [
            {
                breakpoint: 575,
                settings: 'unslick'
            }
        ]
    });
    jQuery('.title__slider').on('afterChange', function () {
        let slides = jQuery('.title__slider .slick-track').children().length;
        var currentSlide = jQuery('.title__slider').slick('slickCurrentSlide');
        if (currentSlide == 0) {
            jQuery('.slick-prev').hide();
            jQuery('.slick-next').show();
        }
        else if (currentSlide == (slides - 1)) {
            jQuery('.slick-next').hide();
            jQuery('.slick-prev').show();
        };
        if (currentSlide > 0 && currentSlide < (slides - 1)) {
            jQuery('.slick-prev').show();
            jQuery('.slick-next').show();
        };
    });
    // jQuery('.title__slider').on('afterChange', function (event, slick, currentSlide) {

    let mySlider = jQuery('.title__slider');
    let lastSlidNum = jQuery('.title__slider .slick-track > div').length - 1;
    let curSlide = 0;

    function userScrollNext(e) {
        mySlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            curSlide = nextSlide;
        });
        if (curSlide < lastSlidNum) {
            e.preventDefault();
            jQuery('.title__slider').slick('slickNext');
        };
    };
    function userScrollPrev(e) {
        mySlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            curSlide = nextSlide;
        });
        if (curSlide > 0) {
            e.preventDefault();
            jQuery('.title__slider').slick('slickPrev');
        };
    };
    mySlider.mousewheel(function (e) {

        if (e.deltaY < 0) {
            userScrollNext(e);
        } else {
            userScrollPrev(e);
        }
    });
    // мобільний свайп
    // function stopSwipe() {
    //     if (curSlide == lastSlidNum) {
    //         console.log('last');
    //         console.log(curSlide);
    //         console.log(lastSlidNum);
    //         $('.title__slider').slick({
    //             slidesToScroll: 1
    //         });
    //     }
    // }
    // stopSwipe();
    // 

    let slides = jQuery('.title__slider .slick-track').children().length;
    var currentSlide = jQuery('.title__slider').slick('slickCurrentSlide');
    if (currentSlide == 0) {
        jQuery('.slick-prev').hide();
    }
    else if (currentSlide == (slides - 1)) {
        jQuery('.slick-next').hide();
    }

    jQuery('.userForm__userTel').inputmask("+38 099 999 99 99");
    jQuery('.partners__slider').slick({
        infinite: true,
        slidesToShow: 5,
        prevArrow: '<div class="slick-prev"><img src="' + templateUrl + '/assets/images/Arrow-prev.svg" alt="prevArrow"></div>',
        nextArrow: '<div class="slick-next"><img src="' + templateUrl + '/assets/images/Arrow-next.svg" alt="nextArrow"></div>',
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    jQuery('.aboutGoods .seeMore').on('click', function () {
        jQuery('.article__text_hideText').toggleClass('visible');
        jQuery('.article__text_hideText').slideToggle('slow');
        if (jQuery('.article__text_hideText').hasClass('visible')) jQuery('.aboutGoods .seeMore').text('Свернуть')
        else jQuery('.aboutGoods .seeMore').text('Подробнее');
    });
    jQuery('.certificate').slick({
        infinite: true,
        slidesToShow: 5,
        prevArrow: '<div class="slick-prev"><img src="' + templateUrl + '/assets/images/Arrow-prev.svg" alt="prevArrow"></div>',
        nextArrow: '<div class="slick-next"><img src="' + templateUrl + '/assets/images/Arrow-next.svg" alt="nextArrow"></div>',
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });
    jQuery('.blockBtn').on('click', function () {
        jQuery('.colorRal').toggleClass('hideBlock');
        if (jQuery('.colorRal').hasClass('hideBlock')) jQuery('.blockBtn .siteBtn').text('Скрыть цвета')
        else jQuery('.blockBtn .siteBtn').text('Смотреть цвета')
    });
});