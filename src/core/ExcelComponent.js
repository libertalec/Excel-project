import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';

        this.emitter = options.emitter;
        this.store = options.store;
        this.subscribe = options.subscribe || [];
        this.unsubscribers = [];

        this.prepare();
    }

    prepare() {

    }

    toHTML() {
        return '';
    }

    // Уведомляем слушателей о событии event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    // Подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }

    storeChanged() {

    }

    isWatching(key) {
        return this.subscribe.includes(key);
    }

    // Используется для инициализации слушателей при стартовом рендеринге
    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();

        this.unsubscribers.forEach(unsub => unsub());
    }
}
