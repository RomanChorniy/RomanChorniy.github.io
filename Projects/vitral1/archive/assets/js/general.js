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

//var templateUrlWp = php_objects.templateUrl;

(function($) {

    $(document).on('ready', function (e) {

        $(".popup-form").on("click",function(e){
            console.log('here');
            e.preventDefault();
            show_form_in_site($(this));
            return false;
        });

        $(".big_box_close, .a_close_box").on("click",function(){
            hide_form_in_site($(this)); return false;}
        );
    });

    $(window).on('load', function (e) {

    });

})(jQuery);

function show_form_in_site(X) {
    var needBoxToShow = jQuery(".black[rel='"+X.attr("rel")+"']");
    needBoxToShow.fadeIn(500);
    var heightWind=parseInt( jQuery(window).height() );
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