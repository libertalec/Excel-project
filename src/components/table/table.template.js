import { toInlineStyles } from '@core/utils';
import { parse } from '@core/parse';
import { defaultStyles } from '@/constants';

const CODES = {
    A: 65,
    Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px';
}

// Создание ячеек для таблицы
function createCell(state, row) {
    return function(_, col) {
        const id = `${row}:${col}`;
        const width = getWidth(state.colState, col);
        const data = state.dataState[id];
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id],
        });

        return `<div class="cell"
                     data-col="${col}"
                     data-id="${id}"
                     data-value="${data || ''}"
                     data-type="cell"
                     contenteditable
                     style="${styles}; width: ${width}"
                >${parse(data) || ''}</div>`;
    };
}

// Создание колонок для таблицы. В данном проекте колонки это буквы в заголовке
function createCol({ col, index, width }) {
    return `<div 
                class="column"
                data-type="resizable"
                data-col="${index}"
                style="width: ${width}"
            >
                ${col}
                <div class="col-resize" data-resize="col"></div>
            </div>`;
}

// Создание строки включает в себя часть row-info - номер строки, а row-data информация (в нашем случае cell)
function createRow(index, content, state) {
    const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : '';
    const height = getHeight(state, index);
    return `
        <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
            <div class="row-info">${index ? index : ''}
            ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

// Парсинг кодов букв в символы
function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index),
        };
    };
}

export function createTable(rowsCount = 15, state = {}) {
    const columnsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    // Заполнение первой строки с буквами в заголовке
    const cols = new Array(columnsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(createCol)
        .join('');

    rows.push(createRow(null, cols, {}));

    // Заполнение таблицы ячейками cell
    for (let row = 0; row < rowsCount; row++) {
        rows.push(createRow(row + 1, new Array(columnsCount)
            .fill('')
            .map(createCell(state, row))
            .join(''), state.rowState));
    }

    return rows.join('');
}
