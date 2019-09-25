const { execSync } = require('child_process');
function gitCommitAndPush(fileName) {
    var label = setting.label;
    var origin_name = setting.origin_name;
    var rep_uri = setting.rep_uri;
    var separator = fileSeparator();

    fs.open(local_folder + separator + ".git", 'wx', (err, fd) => {
        if (!err) {
            // 执行git init

        }

    });
    
    // add && commit && push
    commandExec('git add .', local_folder)
    commandExec('git commit -m "'+fileName+'"', local_folder)
    var beginTime = +new Date();
    commandExec('git push -u '+ origin_name + ' ' + label, local_folder)
    var endTime = +new Date();
    console.log("git push用时"+(endTime-beginTime)+"ms");
    // https://gitee.com/yintianwen7/img-rep/blob/master/gihtest/3060ADBC-7B2F-487E-986C-6CB55CCE2C4A.jpg
    rep_uri.contains
    document.querySelector("#markdown").value = rep_uri.replace(".git", "/") + "/raw/" + label + "/" + path + "/" + fileName;
}

function commandExec(command, path) {
    execSync(command, {cwd: path})
}