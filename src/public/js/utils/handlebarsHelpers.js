export const incHelper = (value, options) => {
    return parseInt(value) + 1;
};

export const decHelper = (value, options) => {
    return parseInt(value) - 1;
};

export const eqHelper = (arg1, arg2, options) => {
    return arg1 === arg2;
};

export const notEqHelper = (arg1, arg2, options) => {
    return arg1 !== arg2;
};

export const paginationHelper = function(currentPage, pagesNumber, options) {
    // TODO: should be 5, but for testing purposes is 3
    const size = 3; // number of pages buttons in the widget

    let startPage = currentPage - Math.floor(size / 2);
    let endPage = currentPage + Math.floor(size / 2);

    if (startPage <= 0) {
        endPage -= (startPage - 1);
        startPage = 1;
    }

    if (endPage > pagesNumber) {
        endPage = pagesNumber;
        if (endPage - size + 1 > 0) {
            startPage = endPage - size + 1;
        } else {
            startPage = 1;
        }
    }

    const context = {
        startFromFirstPage: false,
        pages: [],
        endAtLastPage: false,
    };
    if (startPage === 1) {
        context.startFromFirstPage = true;
    }
    for (let i = startPage; i <= endPage; ++i) {
        context.pages.push({
            page: i,
            isCurrent: i === currentPage,
        });
    }
    if (endPage === pagesNumber) {
        context.endAtLastPage = true;
    }

    return options.fn(context);
};
