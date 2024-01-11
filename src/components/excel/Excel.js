import {$} from '@core/dom';
import { Emitter } from '@core/Emitter';
import { StoreSubscriber } from '@core/StoreSubscriber';
import { updateDate } from '@/redux/actions';
import { preventDefault } from '@core/utils';

export class Excel {
    constructor(options) {
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

    init() {
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault);
        }
        this.store.dispatch(updateDate());
        this.subscriber.subscribeComponents(this.components);
        this.components.forEach(item => item.init());
    }

    destroy() {
        this.subscriber.unsubscribeFromStore();
        this.components.forEach(item => item.destroy());
        document.removeEventListener('contextmenu', preventDefault);
    }
}
