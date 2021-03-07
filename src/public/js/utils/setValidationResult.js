const VALID_CLASS = 'valid-input';
const INVALID_CLASS = 'invalid-input';

const getValidity = (errors) => {
    return (errors.length === 0) ? VALID_CLASS : INVALID_CLASS;
};

export const setValidationHint = (element, errors) => {
    element.innerText = (errors.length !== 0) ? errors.join('\n') : '';
};

export const setValidationResult = (inputField, hintElement, errors) => {
    const validity = getValidity(errors);
    if (inputField.classList.contains(VALID_CLASS) && validity === INVALID_CLASS) {
        inputField.classList.replace(VALID_CLASS, INVALID_CLASS);
    } else if (inputField.classList.contains(INVALID_CLASS) && validity === VALID_CLASS) {
        inputField.classList.replace(INVALID_CLASS, VALID_CLASS);
    } else {
        inputField.classList.add(validity);
    }
    setValidationHint(hintElement, errors);
};
