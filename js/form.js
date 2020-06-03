// функции проверок
const checkRegExp = input => {
    const telephonePattern = /^\+7\d{10}$/;
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!input.hasAttribute('data-regExp')) return true;
    if (input.name === 'email') {
        return new RegExp(emailPattern,'i').test(input.value);
    } else
        return new RegExp(telephonePattern).test('+'+ input.value);
}

// const checkLength;
const checkLength = input => {
    if(!input.hasAttribute('data-length')) return true;
    if(input.value.trim().length < 4) return false;
    else return true;
}

// основная функция
(function formMaster(){
    const form = document.querySelector('.formEnter');

    form.addEventListener('focus', event => {
        const target = event.target;
        const errorText = target.parentNode.querySelector('.error__input');

        if (target.tagName === "INPUT") {
            target.classList.remove('invalid');
            errorText.textContent = '';
        }

    },true);

    form.addEventListener('blur', event => {
        const target = event.target;
        const errorText = target.parentNode.querySelector('.error__input');
        const inputs = [...document.querySelectorAll('.inputForm')];
        const buttonForm = document.querySelector('.buttonForm');
        
        if (target.tagName === "INPUT" && target.hasAttribute('data-invalid')) {
            if (!target.value.trim().length) {
                errorText.textContent = 'This field is nessesary';
                target.classList.add('invalid');
            }
            
            else if (!(checkRegExp(target) && checkLength(target))) {
                target.classList.add('invalid');
                errorText.textContent = target.getAttribute('data-error');
            }
        }

        const inputsInvalid = inputs.filter((item) => item.classList.contains('invalid'));
        const inputsNotError = inputs.filter((item) => item.value.trim().length !== 0);

        const error = inputsNotError.length === inputs.length ? false : true;

        if (!inputsInvalid.length && !error) {
            buttonForm.disabled = false;
        } else buttonForm.disabled = true;

    },true);
})();