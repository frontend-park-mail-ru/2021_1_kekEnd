import MovieModel from './movieModel.js';
import MovieView from './movieView.js';

export default class MovieController {
    constructor(parent) {
        this.view = new MovieView(parent);
        this.model = new MovieModel();
    }
}

