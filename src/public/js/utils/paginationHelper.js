export const paginationHelper = function(currentPage, pagesNumber, options) {
    const size = 5; // количество страниц в виджете пагинации

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
