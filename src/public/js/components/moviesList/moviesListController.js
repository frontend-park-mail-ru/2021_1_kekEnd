import MoviesListModel from './moviesListModel.js';
import MoviesListView from './moviesListView.js';

export default class MoviesListController {
    constructor(parent) {
        this.view = new MoviesListView(parent);
        this.model = new MoviesListModel();
    }
}
