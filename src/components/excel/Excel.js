import {$} from '@core/dom';
import { Emitter } from '@core/Emitter';
import { StoreSubscriber } from '@core/StoreSubscriber';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
        this.store = options.store;
        this.emitter = new Emitter();
        this.subscriber = new StoreSubscriber(this.store);
    }

    getRoot() {
        // Возвращает корневую ноду для Excel
        const $root = $.create('div', 'excel');

        const componentOptions = {
            emitter: this.emitter,
            store: this.store,
        };

        // Перебор переданных классов и их создание
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className);
            const component = new Component($el, componentOptions);

            $el.html(component.toHTML());
            $root.append($el);
            return component;
        });

        return $root;
    }

    render() {
        // Добавление элементов
        this.$el.append(this.getRoot());

        this.subscriber.subscribeComponents(this.components);

        // Инициализация слушателей для элементов
        this.components.forEach(item => item.init());
    }

    destroy() {
        this.subscriber.unsubscribeFromStore();
        this.components.forEach(item => item.destroy());
    }
}
