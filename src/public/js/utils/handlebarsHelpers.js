import '../components/partials/navbar.tmpl';
import '../components/partials/loginIcons.tmpl';

export const registerHandlebarsHelpers = () => {
    // eslint-disable-next-line no-undef
    Handlebars.registerHelper('eq', eqHelper);
    // eslint-disable-next-line no-undef
    Handlebars.registerHelper('notEq', notEqHelper);
    // eslint-disable-next-line no-undef
    Handlebars.registerHelper('inc', incHelper);
    // eslint-disable-next-line no-undef
    Handlebars.registerHelper('dec', decHelper);
    // eslint-disable-next-line no-undef
    Handlebars.registerHelper('gte', gteHelper);
    // eslint-disable-next-line no-undef
    Handlebars.registerHelper('calculateMovieIndex', calculateMovieIndexHelper);
    // eslint-disable-next-line no-undef
    Handlebars.registerHelper('decodeURI', decodeURIHelper);
    // eslint-disable-next-line no-undef
    Handlebars.registerHelper('pagination', paginationHelper);

    // eslint-disable-next-line no-undef
    Handlebars.registerPartial('navbar', Handlebars.templates['navbar.hbs']);
    // eslint-disable-next-line no-undef
    Handlebars.registerPartial('loginIcons', Handlebars.templates['loginIcons.hbs']);
};


export const incHelper = (value) => {
    return parseInt(value) + 1;
};

export const decHelper = (value) => {
    return parseInt(value) - 1;
};

export const eqHelper = (arg1, arg2) => {
    return arg1 === arg2;
};

export const notEqHelper = (arg1, arg2) => {
    return arg1 !== arg2;
};

export const gteHelper = (arg1, arg2) => {
    return arg1 >= arg2;
};

export const calculateMovieIndexHelper = (currentPage, pageSize, index) => {
    return (currentPage - 1) * pageSize + index;
};

export const decodeURIHelper = (str) => {
    return decodeURI(str);
};

export const paginationHelper = (currentPage, pagesNumber, options) => {
    const [startPage, endPage] = getPaginationRange(currentPage, pagesNumber);
    // context includes data for handlebars
    const context = buildContext(startPage, endPage, currentPage, pagesNumber);

    return options.fn(context);
};

const getPaginationRange = (currentPage, pagesNumber) => {
    // TODO: should be 5, but for testing purposes is 3
    const size = 3; // number of pages buttons in the widget

    // current page should be in the middle
    let startPage = currentPage - Math.floor(size / 2);
    let endPage = currentPage + Math.floor(size / 2);

    // handling underflow of start
    if (startPage <= 0) {
        endPage -= (startPage - 1);
        startPage = 1;
    }

    // handling overflow of end
    if (endPage > pagesNumber) {
        endPage = pagesNumber;
        // endPage is set, adjust start so that the range makes {size}
        if (endPage - size + 1 > 0) {
            startPage = endPage - size + 1;
        } else {
            startPage = 1;
        }
    }

    return [startPage, endPage];
};

const buildContext = (start, end, currentPage, pagesNumber) => {
    const context = {
        startFromFirstPage: false,
        pages: [],
        endAtLastPage: false,
    };
    if (start === 1) {
        context.startFromFirstPage = true;
    }
    // pushing pages and keeping flag {isCurrent} to disable that button in the template
    for (let i = start; i <= end; ++i) {
        context.pages.push({
            page: i,
            isCurrent: i === currentPage,
        });
    }
    if (end === pagesNumber) {
        context.endAtLastPage = true;
    }

    return context;
};
