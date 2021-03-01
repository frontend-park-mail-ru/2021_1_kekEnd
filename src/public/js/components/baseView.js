'use strict';


export default class BaseView {
    constructor(parent, template) {
        this.parent = parent;
        this.template = template;
        this.root = '';
    }

    render(root, data) {
        this.root = root;
        this.root.innerHTML = this.template(data);
    }
}
