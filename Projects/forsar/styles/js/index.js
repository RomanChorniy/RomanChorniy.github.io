(function ($) {
    $(function () {
        initMenuButton();
    });

    function initMenuButton() {
        var wrapperMenu = $('#menuBtn');
        let lenguageBtn = $('#lenguageBtn');
        let lichulnukClickiv = 0;

        if (wrapperMenu.length) {
            var menuXBtn = $('#menuXBtn', wrapperMenu);

            menuXBtn.on('click', function () {
                lichulnukClickiv++
                if (lichulnukClickiv === 3) {
                    wrapperMenu.removeClass('open');
                    menuXBtn.removeClass('clouseBtn');
                    lichulnukClickiv = 4;
                } else if (lichulnukClickiv === 5) {
                    wrapperMenu.addClass('open');
                    menuXBtn.addClass('clouseBtn');
                    lichulnukClickiv = 2;
                }
            });

            wrapperMenu.hover(function () {
                wrapperMenu.addClass('open');
                menuXBtn.addClass('clouseBtn');
                lichulnukClickiv = 1;
            },
                function () {
                    wrapperMenu.removeClass('open');
                    menuXBtn.removeClass('clouseBtn');
                    lichulnukClickiv = 0;
                }
            );
        }
        if (lenguageBtn.length) {
            lenguageBtn.hover(function () {
                lenguageBtn.addClass('showMenu');
            },
                function () {
                    lenguageBtn.removeClass('showMenu');
                });
        }
    }
})(jQuery);