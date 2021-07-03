const defaultSettings = {
    'svgWidth': 900,
    'svgHeight': 500,
    'svgBkg': 'none',
    'minCol': 'rgb(200,200,200)',
    'majCol': 'rgb(200,200,200)',
    'maxHistory': '100',
    'smoothFreePathVal': 5,
    'toolTip': true
}

const openSettingsDB = () => {
    removeById('editTable');
    var settingsDB = document.createElement('div');
    settingsDB.id = 'editTable'
    settingsDB.style = `max-height:92%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:white; border:1px solid rgb(160,160,160); border-radius:5px`;
    document.body.append(settingsDB);
    settingsDB.append(document.createElement('hr'));

    //svg size
    var svgSizeDB = document.createElement('div');
    svgSizeDB.style = 'display:flex; align-items:center; justify-content:space-around; padding:8px; font-size:12px;';
    var widthIn = document.createElement('div');
    var heightIn = document.createElement('div');
    widthIn.style = heightIn.style = 'margin:0% 4% 0% 4%; height:14px; font-size:12px; padding:2px; width:25%;border:1px solid rgb(110,110,110);'
    widthIn.setAttribute('contenteditable', 'true');
    heightIn.setAttribute('contenteditable', 'true');
    widthIn.innerText = Math.round(workingArea.clientWidth);
    heightIn.innerText = Math.round(workingArea.clientHeight);
    svgSizeDB.append(document.createTextNode('Size'));
    svgSizeDB.append(widthIn);
    svgSizeDB.append(document.createTextNode('x'));
    svgSizeDB.append(heightIn);
    svgSizeDB.append(document.createTextNode('px'));
    settingsDB.append(svgSizeDB);
    settingsDB.append(document.createElement('hr'));

    //svg background
    var svgBkgDB = document.createElement('div');
    svgBkgDB.style = 'display:flex; align-items:center; justify-content:space-around; padding:8px; font-size:12px;';
    var bkgIn = document.createElement('div');
    bkgIn.style = 'margin:0% 4% 0% 4%; height:14px; font-size:12px; padding:2px; width:75%;border:1px solid rgb(110,110,110);'
    bkgIn.setAttribute('contenteditable', 'true');
    bkgIn.innerText = svg.style.background || 'none';
    svgBkgDB.append(document.createTextNode('Background'));
    svgBkgDB.append(bkgIn);
    settingsDB.append(svgBkgDB);
    settingsDB.append(document.createElement('hr'));


    //grid color
    var gridColDB = document.createElement('div');
    gridColDB.style = 'display:flex; align-items:center; justify-content:space-around; padding:8px; font-size:12px;';
    var minColIn = document.createElement('div');
    minColIn.style = 'margin:0 0 5% 0; height:14px; font-size:12px; padding:2px; width:100%;border:1px solid rgb(110,110,110);'
    minColIn.setAttribute('contenteditable', 'true');
    minColIn.innerText = svg.getElementById('minorGridLines').getAttribute('stroke') || 'rgb(200,200,200)';
    var majColIn = document.createElement('div');
    majColIn.style = 'margin:0%; height:14px; font-size:12px; padding:2px; width:100%;border:1px solid rgb(110,110,110);'
    majColIn.setAttribute('contenteditable', 'true');
    majColIn.innerText = svg.getElementById('majorGridLines').getAttribute('stroke') || 'rgb(200,200,200)';
    gridColDB.append(document.createTextNode('Grid Colour'));
    var colDiv = document.createElement('div');
    colDiv.append(minColIn);
    colDiv.append(majColIn);
    gridColDB.append(colDiv);
    settingsDB.append(gridColDB);
    settingsDB.append(document.createElement('hr'));

    //smoothness in free path
    var smoothFreePathValDB = document.createElement('div');
    smoothFreePathValDB.style = 'display:flex; align-items:center; justify-content:space-around; padding:8px; font-size:12px;';
    var smoothFreePathValIn = document.createElement('div');
    smoothFreePathValIn.style = 'margin:0% 4% 0% 4%; height:14px; font-size:12px; padding:2px; width:25%;border:1px solid rgb(110,110,110);'
    smoothFreePathValIn.setAttribute('contenteditable', 'true');
    smoothFreePathValIn.innerText = smoothFreePathVal;
    smoothFreePathValDB.append(document.createTextNode('Smoothness of Free Path'));
    smoothFreePathValDB.append(smoothFreePathValIn);
    settingsDB.append(smoothFreePathValDB);
    settingsDB.append(document.createElement('hr'));

    //show tooltip mode
    var shwTtDB = document.createElement('div');
    shwTtDB.style = 'display:flex; align-items:center; justify-content:space-around; padding:8px; font-size:12px;';
    var sttIn = document.createElement('input');
    sttIn.setAttribute('type', 'checkbox');
    sttIn.style.cursor = 'pointer';
    sttIn.defaultChecked = showTooltip;
    shwTtDB.append(document.createTextNode('Show Tooltips'));
    shwTtDB.append(sttIn);
    settingsDB.append(shwTtDB);
    settingsDB.append(document.createElement('hr'));

    //maximum history count
    var zoomStepDB = document.createElement('div');
    zoomStepDB.style = 'display:flex; align-items:center; justify-content:space-around; padding:8px; font-size:12px;';
    var stepIn = document.createElement('input');
    stepIn.setAttribute('type', 'number');
    stepIn.setAttribute('min', '10');
    stepIn.setAttribute('max', '1000');
    stepIn.setAttribute('value', maxHistory);
    stepIn.setAttribute('step', '1');
    stepIn.style = 'margin:0% 4% 0% 4%; height:14px; font-size:12px; padding:2px; width:25%;border:1px solid rgb(110,110,110);'
    stepIn.innerText = svg.style.background || 'none';
    zoomStepDB.append(document.createTextNode('Max. History Count'));
    zoomStepDB.append(stepIn);
    settingsDB.append(zoomStepDB);
    settingsDB.append(document.createElement('hr'));

    var okBtn = document.createElement('button');
    okBtn.innerText = 'APPLY';
    settingsDB.append(okBtn);
    settingsDB.append(document.createElement('hr'));

    var ceBtn = document.createElement('button');
    ceBtn.innerText = 'SOURCE';
    settingsDB.append(ceBtn);
    settingsDB.append(document.createElement('hr'));

    ceBtn.style = 'margin:0; width: fit-content';
    ceBtn.addEventListener('click', () => {
        openCodeEditor();
    });

    okBtn.style = 'margin:0; width: fit-content';
    okBtn.addEventListener('click', () => {
        applySettings({
            'svgWidth': widthIn.innerText,
            'svgHeight': heightIn.innerText,
            'svgBkg': bkgIn.innerText,
            'minCol': minColIn.innerText,
            'majCol': majColIn.innerText,
            'maxHistory': stepIn.value,
            'smoothFreePathVal': smoothFreePathValIn.innerText,
            'toolTip': sttIn.checked
        })
    });

};

const applySettings = (settingJSON) => {
    workingArea.style.width = `${parseFloat(settingJSON['svgWidth']) || workingArea.clientWidth}px`;
    workingArea.style.height = `${parseFloat(settingJSON['svgHeight']) || workingArea.clientHeight}px`;
    svg.style.background = settingJSON['svgBkg'] || svg.style.background || '';
    svg.getElementById('minorGridLines').setAttribute('stroke', settingJSON['minCol'] || 'rgb(200,200,200)');
    svg.getElementById('majorGridLines').setAttribute('stroke', settingJSON['majCol'] || 'rgb(200,200,200)');
    maxHistory = Math.max(10, parseInt(settingJSON['maxHistory']));
    smoothFreePathVal = Math.max(5, settingJSON['smoothFreePathVal']) || 5;
    showTooltip = settingJSON['toolTip'];
};

applySettings(defaultSettings);

const openCodeEditor = () => {
    var originalHTML = svg.innerHTML;
    removeById('editTable');
    var codeEditorDB = document.createElement('div');
    codeEditorDB.id = 'editTable'
    codeEditorDB.style = `overflow:hidden; position:absolute; top:50%; left:50%; width:500px; min-height:200px; min-width:350px; max-height:90%; max-width:90%; resize:both; transform:translate(-50%,-50%); background:white; border:1px solid rgb(160,160,160); border-radius:5px`;
    document.body.append(codeEditorDB);

    var warningText = document.createElement('b');
    warningText.style = 'position:absolute; left:0; padding:4px; height:18px; color:red; font-size:small; width:100%; border-bottom:1px solid rgb(160,160,160)';
    warningText.innerText = 'EDIT ONLY IF YOU KNOW WHAT YOU ARE DOING'
    codeEditorDB.append(warningText);

    var codeEditDiv = document.createElement('p')
    codeEditDiv.innerText = originalHTML.replaceAll(/> ?</g, '>\n<');
    codeEditDiv.style = `outline:none; height:calc(100% - 70px); margin-bottom:38px; margin-top:26px; overflow:auto; display:block;text-align:left;font-family:monospace;padding:8px`
    codeEditDiv.setAttribute('contenteditable', 'true');
    codeEditorDB.append(codeEditDiv);

    var footerDiv = document.createElement('div');
    footerDiv.style = 'background:white; width:100%; height:32px; position:absolute; bottom:0; border-top:1px solid rgb(160,160,160)';

    var revertBtn = document.createElement('button');
    revertBtn.style = 'margin:4px; width:fit-content;';
    revertBtn.innerText = 'REVERT';

    var applyBtn = document.createElement('button');
    applyBtn.style = 'margin:4px; width:fit-content;';
    applyBtn.innerText = 'APPLY';

    footerDiv.append(revertBtn);
    footerDiv.append(applyBtn);
    codeEditorDB.append(footerDiv);

    revertBtn.addEventListener('click', () => {
        var temp = svg.cloneNode(true);
        temp.innerHTML = originalHTML;
        openSvg(temp);
        openCodeEditor();
    });

    applyBtn.addEventListener('click', () => {
        try {
            var temp = svg.cloneNode(true);
            temp.innerHTML = codeEditDiv.innerText.replaceAll(/(\d)\n/g, '$1 ').replaceAll('\n', '');
            openSvg(temp);
        } catch (error) {
            console.log(error);
            revertBtn.click();
        };
    });

    codeEditDiv.addEventListener('keydown', (e) => {
        if (e.key == 'Enter' && !e.shiftKey) {
            e.preventDefault();
        };
    });
};

document.getElementById('settingsIcon').addEventListener('click', () => {
    pressEsc();
    openSettingsDB();
});