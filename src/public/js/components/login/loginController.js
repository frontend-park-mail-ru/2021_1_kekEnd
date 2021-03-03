import LoginModel from './loginModel.js';
import LoginView from './loginView.js';

export default class LoginController {
    constructor(parent) {
        this.view = new LoginView(parent);
        this.model = new LoginModel();
    }
}
