export const findAscendingTag = (element, tag) => {
    while (element.tagName !== tag && element !== window && element !== document.body) {
        element = element.parentNode;
    }
    return (element.tagName === tag) ? element : null;
};
