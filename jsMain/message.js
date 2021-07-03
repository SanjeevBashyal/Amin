const openMsgBox = (style, content, life = null, id = null) => {
    var msgBox = document.createElement('div');
    msgBox.setAttribute('class', 'msgBox');
    msgBox.innerHTML = `<pre style='margin:0,padding:0'>${content}</pre>`;
    msgBox.style = style;
    msgBox.style.opacity = 0;
    if (id) {
        removeById(id);
        msgBox.id = id;
    }
    document.body.append(msgBox);
    setTimeout(() => { msgBox.style.opacity = 1 }, 10);
    if (life) {
        setTimeout(() => {
            msgBox.style.opacity = 0;
        }, life * 1000);
        setTimeout(() => {
            msgBox.remove();
        }, 1500 + life * 1000);
    } else {
        return msgBox;
    };
};

var showTooltip = true;
const addToolTip = (obj, content, position = 'bottom') => {
    obj.addEventListener('mouseenter', () => {
        if (showTooltip) {
            removeById('toolTip');
            var bBox = obj.getBoundingClientRect();
            var tt = openMsgBox('', content, null, `${obj.id}ToolTip`);
            switch (position) {
                case 'top':
                    tt.style = `left:${bBox.x + bBox.width/2}px;transform:translate(-50%,-100%);top:${bBox.y-6}px`;
                    break;
                case 'bottom':
                    tt.style = `left:${bBox.x + bBox.width/2}px;transform:translate(-50%);top:${bBox.y+bBox.height+6}px`;
                    break;
                case 'left':
                    tt.style = `left:${bBox.x - 6}px;top:${bBox.y+bBox.height/2}px;transform:translate(-100%,-50%)`;
                    break;
                case 'right':
                    tt.style = `left:${bBox.x + bBox.width+6}px;top:${bBox.y+bBox.height/2}px;transform:translate(0,-50%)`;
                    break;
                default:
                    tt.style = `left:${bBox.x + bBox.width/2}px;top:${bBox.y+bBox.height/2}px;transform:translate(-50%,-50%)`;
                    break;
            }
            tt.id = 'toolTip';
            obj.addEventListener('mouseleave', () => {
                setTimeout(() => { tt.style.opacity = 0; }, 100);
                setTimeout(() => { tt.remove(); }, 500);
            });
        };
    });
};

const openActionMsg = (msg, life = 1) => {
    openMsgBox('bottom:12px;left:50%;transform:translate(-50%)', msg, life, 'actMsg');
};

const openProgressMsg = (msg, per = null) => {
    var msgBox = document.createElement('div');
    msgBox.innerText = per ? `${msg}-${per}%` : msg;
    msgBox.style = 'top:58px;right:50%;transform:translate(50%);color:white;position:absolute;width:fit-content;font-size:14px;padding:4px 8px;border-radius:12px;'
    msgBox.style.background = `linear-gradient(90deg,  rgba(0,0,0,1) ${per||100}%, rgba(0,0,0,0.5) ${per||100}%)`;
    document.body.append(msgBox);
    return msgBox;
}

addToolTip(document.getElementById('xyDisplay'), 'Click to change grid separation', 'top');

addToolTip(document.getElementById('addPoint'), 'Adds Node');
addToolTip(document.getElementById('layer'), 'Layer Properties');
addToolTip(document.getElementById('calculate'), 'Calculate Area');
addToolTip(document.getElementById('Sweb'), 'Open Sweb Original');

addToolTip(document.getElementById('strokeColorIcon'), 'Default Stroke Color');
addToolTip(document.getElementById('strokes'), 'Default Stroke Width');

addToolTip(document.getElementById('majorGrids'), 'Toggle Major Grid On/Off');
addToolTip(document.getElementById('minorGrids'), 'Toggle Minor Grid On/Off');
addToolTip(document.getElementById('resetSvg'), 'Zoom Extents');

addToolTip(document.getElementById('select'), 'Discard Active Tool');
addToolTip(document.getElementById('group'), 'Group [Select+Enter]<br>Ungroup [Ctrl+Click]');
addToolTip(document.getElementById('ccp'), 'Box Select');
addToolTip(document.getElementById('edit'), 'Interactive Transform<br>[About Center]');

addToolTip(document.getElementById('drawLine'), 'Draw Polyline');
addToolTip(document.getElementById('drawPath'), 'Draw Beizer Path');
addToolTip(document.getElementById('drawArc'), 'Draw Arc');
addToolTip(document.getElementById('drawFree'), 'Draw Freehand Path');
addToolTip(document.getElementById('drawEllipse'), 'Draw Ellipse');
addToolTip(document.getElementById('drawRect'), 'Draw Rounded Rectangle');
addToolTip(document.getElementById('drawShape'), 'Draw Shape');
addToolTip(document.getElementById('drawImg'), 'Add Image');

addToolTip(document.getElementById('openSvg'), 'Open a SVG File');
addToolTip(document.getElementById('saveSvg'), 'Save as SVG File');
addToolTip(document.getElementById('savePng'), 'Download as Image<br>[JPG | PNG]');

addToolTip(document.getElementById('settingsIcon'), 'Settings');
