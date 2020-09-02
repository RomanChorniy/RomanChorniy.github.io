const form = document.getElementById('testPage__form');
const userName = document.querySelector('.contact__name_input');
const userPhone = document.querySelector('.contact__phone_input');
const userEmail = document.querySelector('.contact__email_input');
const userPosition = document.querySelector('.contact__position_input');
const submitBtn = document.querySelector('.submitBtn');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkRadioButtons();
    checkInput();
    let inputErros = form.querySelectorAll('.errorMessageShow').length;
    let inputEmpty = form.querySelectorAll('.errorBorder_empty').length;
    let inputIncorect = form.querySelectorAll('.errorBorder_incorect').length;

    if ((inputErros === 0) && (inputEmpty === 0) && (inputIncorect === 0)) {
        finishPage.classList.add('openFinishPage');
        window.scrollTo(0, 0);
        testPage.style.display = 'none';
    };
});

submitBtn.addEventListener("click", function (e) {
    form.submit();
});

function checkRadioButtons() {
    const questionBox = document.getElementsByClassName('questionBox');
    for (let question = 0; question < questionBox.length; question++) {
        const label = questionBox[question].getElementsByClassName('radio');
        let answer = 0;
        for (let input = 0; input < label.length; input++) {
            if (label[input].children[0].checked) {
                answer = 1;
                break;
            };
        };
        if (answer === 0) showErrorTestMessage(questionBox[question])
        else cleanErrorTestMessage(questionBox[question])
    };
};

function showErrorTestMessage(questionBox) {
    questionBox.classList.add('errorMessageShow');
};
function cleanErrorTestMessage(questionBox) {
    questionBox.classList.remove('errorMessageShow');
};

function checkInput() {
    const nameValue = userName.value.trim();
    const phoneValue = userPhone.value.trim();
    const emailValue = userEmail.value.trim();
    const positionValue = userPosition.value.trim();

    if (nameValue === '') setErrorFor(userName)
    else setSucses(userName);

    if (phoneValue === '') setErrorFor(userPhone)
    else if (!isPhone(phoneValue)) {
        incorectValue(userPhone)
    }
    else setSucses(userPhone);

    if (emailValue === '') setErrorFor(userEmail)
    else if (!isEmail(emailValue)) {
        incorectValue(userEmail)
    }
    else setSucses(userEmail);

    if (positionValue === '') setErrorFor(userPosition)
    else setSucses(userPosition);

};

function setErrorFor(input) {
    const contactBox = input.parentElement;
    contactBox.classList.add('errorBorder_empty');
    contactBox.classList.remove('errorBorder_incorect');
};
function incorectValue(input) {
    const contactBox = input.parentElement;
    contactBox.classList.add('errorBorder_incorect');
    contactBox.classList.remove('errorBorder_empty');
}
function setSucses(input) {
    const contactBox = input.parentElement;
    contactBox.classList.remove('errorBorder_empty');
    contactBox.classList.remove('errorBorder_incorect');
};

function isEmail(email) {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
}
function isPhone(phone) {
    return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(phone)
};