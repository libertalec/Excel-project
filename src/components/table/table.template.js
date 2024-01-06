// ASC коды букв
const CODES = {
    A: 65,
    Z: 90,
};

// Создание ячеек для таблицы
function createCell(row) {
    return function(_, col) {
        return `<div class="cell"
                     data-col="${col}"
                     data-id="${row}:${col}"
                     data-type="cell"
                     contenteditable
                ></div>`;
    };
}

// Создание колонок для таблицы. В данном проекте колонки это буквы в заголовке
function createCol(col, index) {
    return `<div class="column" data-type="resizable" data-col="${index}">${col}
                <div class="col-resize" data-resize="col"></div>
            </div>`;
}

// Создание строки включает в себя часть row-info - номер строки, а row-data информация (в нашем случае cell)
function createRow(index, content) {
    const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : '';

    return `
        <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 15) {
    const columnsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    // Заполнение первой строки с буквами в заголовке
    const cols = new Array(columnsCount)
        .fill('')
        .map(toChar)
        .map(createCol)
        .join('');

    rows.push(createRow(null, cols));

    // Заполнение таблицы ячейками cell
    for (let row = 0; row < rowsCount; row++) {
        rows.push(createRow(row+1, new Array(columnsCount)
            .fill('')
            .map(createCell(row))
            .join('')));
    }

    return rows.join('');
}
