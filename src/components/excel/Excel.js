import {$} from '@core/dom';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
    }

    getRoot() {
        // Возвращает корневую ноду для Excel
        const $root = $.create('div', 'excel');

        // Перебор переданных классов и их создание
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className);
            const component = new Component($el);

            $el.html(component.toHTML());
            $root.append($el);
            return component;
        });

        return $root;
    }

    render() {
        // Добавление элементов
        this.$el.append(this.getRoot());

        // Инициализация слушателей для элементов
        this.components.forEach(item => item.init());
    }
}
