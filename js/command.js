const { execSync } = require('child_process');
function gitCommitAndPush(fileName) {
    // add && commit && push
    commandExec('git add .', setting.local_folder)
    commandExec('git commit -m "'+fileName+'"', setting.local_folder)
    var beginTime = +new Date();
    commandExec('git push -u '+ setting.origin_name + ' ' + setting.label, setting.local_folder)
    var endTime = +new Date();
    console.log("git push用时"+(endTime-beginTime)+"ms");
    // https://gitee.com/yintianwen7/img-rep/blob/master/gihtest/3060ADBC-7B2F-487E-986C-6CB55CCE2C4A.jpg
}

function commandExec(command, path) {
    execSync(command, {cwd: path})
}