/**
 * Базовый класс компонента
 */
export class Component {
    /**
     * Конструктор компонента
     * @param {Object} parent - родитель компонента
     * @param {Object} state - перечиление полей-состояний компонента
     */
    constructor(parent, state) {
        this.parent = parent;
        this.state = state;
    }

    /**
     * Отрисовка компонента
     */
    render() {}
}
