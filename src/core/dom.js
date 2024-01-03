class Dom {
    // Обертка дом может включать в себя дом ноду двумя разными способами передачи
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
    }

    // Геттер и сеттер для html
    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }

        return this.$el.outerHTML.trim();
    }

    // Отчистка html кода внутри элемента
    clear() {
        this.html('');
        return this;
    }

    // Нащ аналог addEventListeners для нашего класса Dom
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }

    // Кастомный метод append для Dom (наших) элементов
    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }

        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }

        return this;
    }

    get data() {
        return this.$el.dataset;
    }
    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    css(styles) {
        Object.keys(styles)
            .forEach(prop => this.$el.style[prop] = styles[prop]);
    }
}

export function $(selector) {
    return new Dom(selector);
}

// Метод по созданию элемента. Сделан для разгрузки кода
$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);

    if (classes) el.classList.add(classes);

    return $(el);
};