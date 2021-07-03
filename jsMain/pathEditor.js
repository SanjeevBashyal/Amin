var activePathHandle = null;
var activeEditPath = null;
var activeDataIndex = null;
var activeDataLen = null;
var activePathDataAttr = null;
var originalPathData = null;

const removeTransformFromPath = (obj) => {
	var m = obj.getCTM();
	var TdObj = obj.getAttribute('d');
	var points = [...TdObj.matchAll(/[A-Z]?\s?[-\d.\s]+/g)];
	var dObj = '';
	for (var x in points) {
		var pt = points[x];
		var ptList = pt[0].slice(1).split(/\s/).map((x) => { return parseFloat(x) }).filter((x) => { return x == 0 || x });
		var outPtList = [];
		if (ptList.length % 2 == 0) {
			for (i = 0; i < ptList.length; i += 2) {
				outPtList.push(getScreenPoint([ptList[i], ptList[i + 1]], m).join(' '));
			}
		} else if (ptList.length == 7) {
			outPtList = [ptList.slice(0, 2).join(' '), ptList.slice(2, 5).join(' '), getScreenPoint([ptList[5], ptList[6]], m).join(' ')];
		}
		var index = pt.index;
		dObj += pt[0][0] + '\n' + outPtList.join('\n') + '\n';
		};
	obj.setAttribute('d',dObj);
	obj.removeAttribute('transform');
};

const drawPtHandle = (point, index) => {
    var pt = point.split(/\s/);
    var pHandle = addObject('use', { 'href': '#pathHandle', 'x': pt[0], 'y': pt[1], 'class': 'handle' });
    pHandle.addEventListener('click', () => {
        if (activePathHandle) {
            activePathHandle = null;
            activeDataIndex = null;
            activeDataLen = null;
        } else {
            activePathHandle = pHandle;
            activeDataIndex = index;
            activeDataLen = point.length;
        };
        originalPathData = activeEditPath.getAttribute(activePathDataAttr);
    });
};

const editPath = (path) => {
    activeEditPath = path;
    activePathDataAttr = path.getAttribute('d') ? 'd' : 'points';
    if (!/[a-z]/.exec(activeEditPath.getAttribute(activePathDataAttr))) {
		removeTransformFromPath(path);
        var pathEditorHandle = document.createElementNS(ns, 'ellipse');
        pathEditorHandle.setAttribute('fill', 'white');
        pathEditorHandle.setAttribute('stroke-width', 1 / svgUnits);
        pathEditorHandle.setAttribute('stroke', 'black');
        pathEditorHandle.setAttribute('cx', 0);
        pathEditorHandle.setAttribute('cy', 0);
        pathEditorHandle.setAttribute('rx', 5 / svgUnits);
        pathEditorHandle.setAttribute('id', 'pathHandle');
        pushToDefs(pathEditorHandle);

        var pathTangents = document.createElementNS(ns, 'g');
        var pathTangent1 = document.createElementNS(ns, 'path');
        pathTangent1.setAttribute('fill', 'none');
        pathTangent1.setAttribute('stroke-width', 0.5 / svgUnits);
        pathTangent1.setAttribute('stroke', 'black');
        pathTangent1.setAttribute('stroke-dasharray', `${10/svgUnits} ${10/svgUnits}`);
        var pathTangent2 = pathTangent1.cloneNode(true);
        pathTangent2.setAttribute('stroke', 'white');
        pathTangent2.setAttribute('stroke-dashoffset', `${10/svgUnits}`);
        pathTangents.append(pathTangent1);
        pathTangents.append(pathTangent2);
        pathTangents.id = 'pathTangents';
        svg.append(pathTangents);
		activeTool = 'editPath';
        openActionMsg(`Active Tool: Edit Path`, null);
        editPathFx();
    };
}

const editPathFx = () => {
    Array.from(svg.getElementsByClassName('handle')).forEach((x) => { x.remove(); });
    svg.getElementById('pathTangents').childNodes.forEach((z) => z.setAttribute('d', ''));

    var data = activeEditPath.getAttribute(activePathDataAttr);
    originalPathData = originalPathData || data;

    var points = [...data.matchAll(/[A-Z]?\s?[-\d.\s]+/g)];
    var tPt = 'M';

    points.forEach((point) => {
        if (point[0][0] == 'A') {
            var pts = [...point[0].matchAll(/[-\d.]+/g)];
            drawPtHandle(`${pts[5][0]} ${pts[6][0]}`, point.index + pts[5].index);
            tPt += ' ' + `${pts[5][0]} ${pts[6][0]}`;
        } else {
            var pts = [...point[0].matchAll(/[-\d.]+\s[-\d.]+/g)];
            pts.forEach((pt) => {
                drawPtHandle(pt[0], point.index + pt.index);
            });
			tPt += ' ' + pts.join(' ');
        }
    });
	
    svg.getElementById('pathTangents').childNodes.forEach((z) => z.setAttribute('d', tPt));
};

workingArea.addEventListener('mousemove', () => {
    if (activePathHandle) {
        var pt = coordinates.innerText.replace(',', '');
        var d = activeEditPath.getAttribute(activePathDataAttr);
        activeEditPath.setAttribute(activePathDataAttr, d.slice(0, activeDataIndex) + pt + d.slice(activeDataIndex + activeDataLen));
        activeDataLen = pt.length;
        editPathFx();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        if (activeEditPath) {
            activeEditPath.setAttribute(activePathDataAttr, originalPathData);
        };
        originalPathData = null;
        activeEditPath = null;
        activePathHandle = null;
        removeById('pathHandle');
        removeById('pathTangents');
        Array.from(svg.getElementsByClassName('handle')).forEach((x) => { x.remove(); });
    };
});