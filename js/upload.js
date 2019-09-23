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
const { exec } = require('child_process');
const nativeImage = require('electron').nativeImage
const settingMoudle = require("./js/setting");

const setting = settingMoudle.getSetting();
var local_folder = setting.local_folder;
var path = setting.path;
var label = setting.label;
var origin_name = setting.origin_name;
var rep_uri = setting.rep_uri;
var separator = fileSeparator();

document.getElementById('button').onclick = function () {
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
    gitCommond(newFileName);
    alert("OK")
}

function gitCommond(fileName) {

    fs.open(local_folder + separator + ".git", 'wx', (err, fd) => {
        if (!err) {
            // 执行git init

        }

    });
    // add && commit && push
    gitExec('git add .', local_folder)
    gitExec('git commit -m "add image"', local_folder)
    gitExec('git push -u '+ origin_name + ' ' + label, local_folder)
    // https://gitee.com/yintianwen7/img-rep/blob/master/gihtest/3060ADBC-7B2F-487E-986C-6CB55CCE2C4A.jpg
    document.querySelector("#markdown").value = rep_uri.replace(".git", "/") + "raw/" + label + "/" + path + "/" + fileName;
}

// Mousetrap.bind('ctrl+v', function() {
//     console.log('command shift k'); 
//     const { clipboard, Tray } = require('electron').remote
//     const image = clipboard.readImage()
//     const appIcon = new Tray(image)
//     console.log(appIcon)
// });

function gitExec(command, path) {
    exec(command, {cwd: path}, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
            throw err
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    })
}

function fileSeparator() {
    return isWindows() ? "\\" : "/";
}

function isWindows() {
    return process.platform.indexOf("win") > -1
}

// UUID
var uuidChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
function uuid() {
    var r;
    var uuid = [];
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
            r = 0 | Math.random() * 16;
            uuid[i] = uuidChars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
    }
    return uuid.join("");
}