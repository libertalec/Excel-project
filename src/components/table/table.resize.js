import { $ } from '@core/dom';

export function resizeHandler($root, event) {
    return new Promise(resolve => {
        const $resizer = $(event.target);
        const $resizerParent = $resizer.closest('[data-type="resizable"]');
        const nodeCoords = $resizerParent.getCoords();
        const type = $resizer.data.resize;
        const sideProp = type === 'col' ? 'bottom' : 'right';
        let value;

        $resizer.css({ opacity: 1, [sideProp]: '-5000px' });

        document.onmousemove = e => {
            if (type === 'col') {
                const delta = e.pageX - nodeCoords.right;
                value = nodeCoords.width + delta;
                $resizer.css({ right: -delta + 'px' });
            } else {
                const delta = e.pageY - nodeCoords.bottom;
                value = nodeCoords.height + delta;
                $resizer.css({ bottom: -delta + 'px' });
            }
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;

            if (type === 'col') {
                $resizerParent.css({ width: value + 'px' });
                $root
                    .findAll(`[data-col="${$resizerParent.data.col}"]`)
                    .forEach(item => item.style.width = value + 'px');
            } else {
                $resizerParent.css({ height: value + 'px' });
            }

            resolve({
                value,
                type,
                id: $resizerParent.data[type],

            });

            $resizer.css({ opacity: 0, bottom: 0, right: 0 });
        };
    });
}
