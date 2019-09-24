var fs = require('fs');
var path = require("path");

function getSetting() {
    return JSON.parse(localStorage.getItem("setting"))
}

function setting(config) {
    settingOnChange(config);
    // 创建本地目录
    var target = config.local_folder + fileSeparator() + config.path

    if (!fs.existsSync(target)) {
        mkdirsSync(target);

    }

    // 是否存在 .git

    // git clone 

    // git pull

}

function init() {
    // 读取配置文件
    var configFile = process.env.HOME + fileSeparator() + 'setting.json'
    if (fs.existsSync(configFile)) {
        var data = fs.readFileSync(configFile);
        localStorage.setItem("setting", data.toString())

    }
}

function settingOnChange(config) {
    var configFile = process.env.HOME + fileSeparator() + 'setting.json'
    var configJSON;
    // 更新配置文件
    fs.writeFile(configFile, configJSON = JSON.stringify(config), 'utf8', function (error) {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('写入成功');
    })
    // 更新全局变量
    localStorage.setItem("setting", configJSON);
}

//递归创建目录 同步方法  
function mkdirsSync(dirname) {
    //console.log(dirname);  
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

function reload() {

}

module.exports = {
    getSetting: getSetting,
    init: init,
    reload: reload
}