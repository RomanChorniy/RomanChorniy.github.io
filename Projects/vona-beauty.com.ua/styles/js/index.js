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
});