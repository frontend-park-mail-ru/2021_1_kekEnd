const VALID_CLASS = 'valid-input';
const INVALID_CLASS = 'invalid-input';

const getValidity = (errors) => {
    return (errors.length === 0) ? VALID_CLASS : INVALID_CLASS;
};

export const setValidityClass = (element, errors) => {
    const newClass = getValidity(errors);
    if (element.classList.contains(VALID_CLASS) && newClass === INVALID_CLASS) {
        element.classList.replace(VALID_CLASS, INVALID_CLASS);
    } else if (element.classList.contains(INVALID_CLASS) && newClass === VALID_CLASS) {
        element.classList.replace(INVALID_CLASS, VALID_CLASS);
    } else {
        element.classList.add(newClass);
    }
};
