import { $ } from '@core/dom';

export function resizeHandler($root, event) {
    const $resizer = $(event.target);
    const $resizerParent = $resizer.closest('[data-type="resizable"]');
    const nodeCoords = $resizerParent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let newWidthValue;

    $resizer.css({ opacity: 1, [sideProp]: '-5000px' });

    document.onmousemove = e => {
        if (type === 'col') {
            const delta = e.pageX - nodeCoords.right;
            newWidthValue = nodeCoords.width + delta;
            $resizer.css({ right: -delta + 'px' });
        } else {
            const delta = e.pageY - nodeCoords.bottom;
            newWidthValue = nodeCoords.height + delta;
            $resizer.css({ bottom: -delta + 'px' });
        }
    };

    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;

        if (type === 'col') {
            $resizerParent.css({ width: newWidthValue + 'px' });
            $root
                .findAll(`[data-col="${$resizerParent.data.col}"]`)
                .forEach(item => item.style.width = newWidthValue + 'px');
        } else {
            $resizerParent.css({ height: newWidthValue + 'px' });
        }

        $resizer.css({ opacity: 0, bottom: 0, right: 0 });
    };
}
