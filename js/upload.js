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
var path = require("path");

document.getElementById('file').onchange = function () {
    var f = document.querySelector('#file');
    if (f.value != "") {
        upload(f.files[0].path);
        f.value = null;
    } else {
        alert('未选择图片哦')

    }
}

function upload(fromPath) {
    var prefix = uuid();
    var suffix = fromPath.substring(fromPath.indexOf("."));
    var targetFolder = setting.local_folder + fileSeparator() + setting.path;
    var newFileName = targetFolder + fileSeparator() + prefix + suffix;
    mkdirsSyncIfNecessary(targetFolder)
    fs.writeFileSync(newFileName, fs.readFileSync(fromPath));
    gitCommitAndPush(prefix + suffix);
    alert("OK")
}

function mkdirsSyncIfNecessary(dirname) {
    //console.log(dirname);  
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSyncIfNecessary(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}