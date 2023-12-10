const CODES = {
    A: 65,
    Z: 90,
};

function createCell() {
    return `<div class="cell" contenteditable></div>`;
}

function createCol(col) {
    return `<div class="column">${col}</div>`;
}

function createRow(index, content) {
    return `
        <div class="row">
            <div class="row-info">${index ? index : ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
    const columnsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(columnsCount)
        .fill('')
        .map(toChar)
        .map(createCol)
        .join('');

    rows.push(createRow(null, cols));

    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(i+1, new Array(columnsCount)
            .fill('')
            .map(createCell)
            .join('')));
    }

    return rows.join('');
}
