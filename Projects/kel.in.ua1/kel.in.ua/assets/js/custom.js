function changeViewport() {
    var mvp = document.getElementById("dynamicViewport");

    if (screen.width < 576) {
        mvp.setAttribute("content", "width=device-width, initial-scale=1, user-scalable=1");
    } else {
        mvp.setAttribute("content", "width=1140, user-scalable=1");
    }
}

changeViewport();

window.onresize = function (event) {
    changeViewport();
};

var templateUrl = php_objects.templateUrl;
var ajaxurl = php_objects.ajaxurl;
var posts = php_objects.posts;
var current_page = php_objects.current_page;
var max_page = php_objects.max_page;
var more_text = php_objects.more_text;
var loading_text = php_objects.loading_text;

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
                $('html, body').animate({scrollTop: 0});
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

    $(document).ready(function () {
        $('.whatWeDo__slider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
                prevArrow: "<div class='prevBox'><img src='" + templateUrl + "/assets/images/prev-arrow.svg' class='prev' alt='prev arrow'></div>",
                nextArrow: "<div class='nextBox'><img src='" + templateUrl + "/assets/images/next-arrow.svg' class='next' alt='next arrow'></div>",
                responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 3,
                        infinite: true,
                        arrows: false
                    }
                },
                {
                    breakpoint: 430,
                    settings: {
                        slidesToShow: 2,
                        arrows: false
                    }
                }
            ]
        });
        $('.gallery__slider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
                prevArrow: "<div class='prevBox'><img src='" + templateUrl + "/assets/images/prev-arrow.svg' class='prev' alt='prev arrow'></div>",
                nextArrow: "<div class='nextBox'><img src='" + templateUrl + "/assets/images/next-arrow.svg' class='next' alt='next arrow'></div>",
                autoplay: true,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 3,
                        infinite: true,
                        arrows: true
                    }
                },
                {
                    breakpoint: 430,
                    settings: {
                        slidesToShow: 2,
                        arrows: true
                    }
                }
            ]
        });
        $('.slider__big').slick({
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.slider__vertical',
            arrows: false
        });
        $('.slider__vertical').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
                prevArrow: "<div class='prevBox'><img src='" + templateUrl + "/assets/images/prev-arrow.svg' class='prev' alt='prev arrow'></div>",
                nextArrow: "<div class='nextBox'><img src='" + templateUrl + "/assets/images/next-arrow.svg' class='next' alt='next arrow'></div>",
                vertical: true,
                verticalSwiping: true,
                asNavFor: '.slider__big',
                focusOnSelect: true
        });
        //$(function () {
        //    $("#slider-range").slider({
        //        range: true,
        //        min: 0,
        //        max: 20,
        //        values: [4, 15],
        //        slide: function (event, ui) {
        //            $(".range__start_input").val(ui.values[0] + " 000");
        //            $(".range__end_input").val(ui.values[1] + " 000");
        //        }
        //    });
        //    $(".range__start_input").val($("#slider-range").slider("values", 0) + " 000");
        //    $(".range__end_input").val($("#slider-range").slider("values", 1) + " 000");
        //});
        $(".statusClouse").click(function () {
            $(".leftBar").removeClass('closeBar');
        });
        $(".statusOpen").click(function () {
            $(".leftBar").addClass('closeBar');
        });
        $('.listTitle').on('click', function (e) {
            let userBtn = e.target.classList;

            if (userBtn.contains('closeGroup')) userBtn.remove('closeGroup')
            else userBtn.add('closeGroup');
        });
        $('.burgerMenu__openBtn').on('click', function () {
            $('.mobile__nav').css('display', 'block');
        });
        $('.mobile__nav .close__button').on('click', function () {
            $('.mobile__nav').css('display', 'none');
        });
        $('.filterBtn').on('click', function () {
            $('.leftBar').css('display', 'block');
        });
        $('.filterBlock .close__button').on('click', function () {
            $('.leftBar').css('display', 'none');
        });
        $('.telephoneList').on('click', function () {
            $('.telephoneList').toggleClass('show');
        });
        $(document).on('click', function (e) {
            let div = $(".telephoneList");
            let div2 = $(".language");

            if (!div.is(e.target) && div.has(e.target).length === 0) div.removeClass('show');
            if (!div2.is(e.target) && div2.has(e.target).length === 0) div2.removeClass('show');
        });
        $('.language').on('click', function () {
            $('.language').toggleClass('show');
        });
    });

})(jQuery);

(function($) {

    $(document).on('ready', function (e) {

        $('.tovar.container .info .size input[type="radio"]').change(function (){
            $('form.cart.buyBox input[name="bifo-size-field"]').val(this.value);
           //console.log(this.value);
        });


        // $('.bifo_loadmore').click(function(){
        //
        //     var button = $(this),
        //         data = {
        //             'action': 'loadmore',
        //             'query': php_objects.posts, // that's how we get params from wp_localize_script() function
        //             'page' : current_page
        //         };
        //
        //     $.ajax({ // you can also use $.post here
        //         url : ajaxurl, // AJAX handler
        //         data : data,
        //         type : 'POST',
        //         beforeSend : function ( xhr ) {
        //             button.text(loading_text); // change the button text, you can also add a preloader image
        //         },
        //         success : function( data ){
        //             if( data ) {
        //                 button.text( more_text + ' 1 ' ).prev().append(data); // insert new posts
        //                 current_page++;
        //
        //                 if ( current_page === parseInt(max_page)) {
        //                     button.remove(); // if last page, remove the button
        //                 }
        //                 // you can also fire the "post-load" event here if you use a plugin that requires it
        //                 // $( document.body ).trigger( 'post-load' );
        //             } else {
        //                 button.remove(); // if no data, remove the button as well
        //             }
        //         }
        //     });
        // });



        var canBeLoaded = true, // this param allows to initiate the AJAX call only if necessary
            bottomOffset = 2000; // the distance (in px) from the page bottom when you want to load more posts

        $(window).scroll(function(){
            var data = {
                'action': 'loadmore',
                'query': php_objects.posts,
                'page' : current_page
            };
            if( $(document).scrollTop() > ( $(document).height() - bottomOffset ) && canBeLoaded === true ){
                $.ajax({
                    url : ajaxurl,
                    data: data,
                    type: 'POST',
                    beforeSend: function( xhr ){
                        // you can also add your own preloader here
                        // you see, the AJAX call is in process, we shouldn't run it again until complete
                        canBeLoaded = false;
                    },
                    success:function(data){
                        if( data ) {
                            $('.filterResultBlock').find('div.cart:last-of-type').after( data ); // where to insert posts
                            canBeLoaded = true; // the ajax is completed, now we can run it again
                            current_page++;
                        }
                    }
                });
            }
        });



        $('ul.brandBlock li input').click(function(){
            window.location.href = $(this).attr('data-link');
            return;
        });

        $('label.sortirovkaBtn input').change(function(){
            var price_order = 'asc';
            if($(this).is(":checked")) {
                price_order = 'ASC';
            } else {
                price_order = 'DESC';
            }
            //console.log(price_order);
            var data = {
                'action': 'prices_order',
                'query': php_objects.posts, // that's how we get params from wp_localize_script() function
                'page' : current_page,
                'order' : price_order
            };
            $.ajax({ // you can also use $.post here
                url : ajaxurl, // AJAX handler
                data : data,
                type : 'POST',
                beforeSend : function ( xhr ) {
                    //button.text(loading_text); // change the button text, you can also add a preloader image
                },
                success : function( data ){
                    if( data ) {
                        $('.filterResultBlock__container').html(data); // insert new posts
                    } else {
                        $('.filterResultBlock__container').html('');
                    }
                }
            });
        });

        $('div.sizeBlock input').change(function(){
            setFilter();
        });

        $(".show_form").on("click",function(){
            show_form_in_site($(this)); return false;}
        );

        $(".big_box_close, .a_close_box").on("click",function(){
            hide_form_in_site($(this)); return false;}
        );

    });

    $(window).on('load', function (e) {

    });

    function show_form_in_site(X) {
        var needBoxToShow=$(".black[rel='"+X.attr("rel")+"']");
        needBoxToShow.fadeIn(500);
        var heightWind=parseInt($(window).height());
        var heightBox=parseInt(needBoxToShow.find(".form_box").outerHeight());
        var heighRaz=heightWind-heightBox;
        if(heighRaz>0){
            needBoxToShow.find(".form_box").css("top",parseInt(heighRaz/2)+"px");
        }
        return false;
    }

    function hide_form_in_site(X) {
        X.closest(".black").fadeOut(500);
        return false;
    }

})(jQuery);

function getSizes() {
    var size_array = [];
    jQuery('div.sizeBlock input').each(function (index, value) {
        if(jQuery(this).is(":checked")) {
            size_array.push(jQuery(this).attr('data_size'));
        }
    });
    return size_array;
}

function getPriceRange() {
    priceRange = explode(',', jQuery("#price_range").val())
    return priceRange;
}

function price_range_changed(range) {
    jQuery("#price_range").val(range);
    setFilter();
}

function setFilter() {
    sizeArray = getSizes();
    //console.log(sizeArray);

    priceRange = getPriceRange();
    //console.log(priceRange);

    var data = {
        'action': 'filter',
        'query': php_objects.posts, // posts, // that's how we get params from wp_localize_script() function
        'page' : current_page,
        'prices' : priceRange,
        'sizes' : sizeArray
    };

    jQuery.ajax({ // you can also use $.post here
        url : ajaxurl, // AJAX handler
        data : data,
        type : 'POST',
        beforeSend : function ( xhr ) {
            //button.text(loading_text); // change the button text, you can also add a preloader image
        },
        success : function( data ){
            if( data ) {
                jQuery('.filterResultBlock__container').html(data);
            } else {
                jQuery('.filterResultBlock__container').html('');
            }
        }
    });
}

// jQuery('.variations_form.cart input.input-text.qty.text').attr('hidden', true);
//
// jQuery('.toBasket.siteBtn').click(function() {
//     jQuery('form.variations_form.cart').submit();
// });

// Utils

function implode( glue, pieces ) {	// Join array elements with a string
    return ( ( pieces instanceof Array ) ? pieces.join ( glue ) : pieces );
}

function explode( delimiter, string ) {	// Split a string by string
    var emptyArray = { 0: '' };
    if ( arguments.length != 2 || typeof arguments[0] == 'undefined' || typeof arguments[1] == 'undefined' ) {
        return null;
    }
    if ( delimiter === '' || delimiter === false || delimiter === null ) {
        return false;
    }
    if ( typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object' ) {
        return emptyArray;
    }
    if ( delimiter === true ) {
        delimiter = '1';
    }
    return string.toString().split ( delimiter.toString() );
}