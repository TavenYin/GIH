var setting = {
    "rep_uri":"https://gitee.com/yintianwen7/img-rep.git",
    "local_folder":"D:\\dev\\git_project\\taven\\img-rep\\",
    "path": "gihtest",
    "origin_name": "gitee",
    "label": "master"
}

function getSetting() {
    return setting;
}

function setSetting(config) {
    this.setting = config
}

function init() {

}

function reload() {

}

module.exports = {
    getSetting: getSetting,
    setSetting: setSetting,
    init: init,
    reload: reload
}