import SignupModel from './signupModel.js';
import SignupView from './signupView.js';

export default class SignupController {
    constructor(parent) {
        this.view = new SignupView(parent);
        this.model = new SignupModel();
    }
}
