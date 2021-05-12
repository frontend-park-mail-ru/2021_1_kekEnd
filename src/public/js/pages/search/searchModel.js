import {globalEventBus} from 'utils/eventbus';
import {busEvents} from 'utils/busEvents';

/**
 * Модель страницы поиска
 */
export default class SearchModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on(busEvents.GET_SEARCH_RESULTS, this.getSearchResults.bind(this));
    }

    /**
     * Получение поисковой выдачи
     * @param {string} query - строка поиска
     */
    getSearchResults(query) {
        // TODO: api call
        globalEventBus.emit(busEvents.SET_SEARCH_RESULTS, {
            query: query,
        });
    }
}
