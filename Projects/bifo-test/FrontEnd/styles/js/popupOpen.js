const button = document.querySelector('.testButton__btn');
const buttonDown = document.querySelector('.btnDown');
const testPage = document.querySelector('.testPage__popup');
const finishPage = document.querySelector('.finishPage__popup');
const formCloseBtn = document.querySelector('.form__btn_close');
button.addEventListener('click', function (e) {
    testPage.style.display = 'block';
});
buttonDown.addEventListener('click', function (e) {
    testPage.style.display = 'block';
});
formCloseBtn.addEventListener('click', function (e) {
    testPage.style.display = 'none';
});