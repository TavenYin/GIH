// 拖拽功能，完全没看懂 怎么实现的
document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    for (const f of e.dataTransfer.files) {
        console.log('File(s) you dragged here: ', f.path)
        cpFile(f.path)
    }
});
document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

const fs = require("fs");
const settingMoudle = require("./js/setting");

const setting = settingMoudle.getSetting();
var local_folder = setting.local_folder;
var path = setting.path;


document.getElementById('file').onchange = function () {
    var f = document.querySelector('#file');
    if (f.value != "") {
        cpFile(f.files[0].path);
        f.value = null;
    } else {
        alert('未选择图片哦')

    }
}

function cpFile(fromPath) {
    var prefix = uuid();
    var suffix = fromPath.substring(fromPath.indexOf("."));
    var newFileName = local_folder + path + fileSeparator() + prefix + suffix;
    fs.writeFileSync(newFileName, fs.readFileSync(fromPath));
    gitCommitAndPush(prefix + suffix);
    alert("OK")
}
