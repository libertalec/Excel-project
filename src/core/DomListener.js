import {capitalize} from '@core/utils';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) throw new Error('invalid root');

        this.$root = $root; // Корневой элемент для каждого компонента
        this.listeners = listeners;
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);

            if (!this[method]) {
                throw new Error(
                    // eslint-disable-next-line max-len
                    `Method ${method} is not implemented in ${this.name} Component`
                );
            }
            // Привязываем контекст this для этого метода навсегда
            // Bind используется для того, чтобы в методах (внутри компонентов) не терялся контекст
            this[method] = this[method].bind(this);

            this.$root.on(listener, this[method]);
        });
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);

            if (!this[method]) {
                throw new Error(
                    // eslint-disable-next-line max-len
                    `Method ${method} is not implemented in ${this.name} Component`
                );
            }

            this.$root.off(listener, this[method]);
        });
    }
}

// Добавление приставки on для слушателя
function getMethodName(eventName) {
    return 'on' + capitalize(eventName);
}
