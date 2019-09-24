const { exec } = require('child_process');
function gitCommitAndPush(fileName, setting) {
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
    gitExec('git add .', local_folder)
    gitExec('git commit -m "'+fileName+'"', local_folder)
    gitExec('git push -u '+ origin_name + ' ' + label, local_folder)
    // https://gitee.com/yintianwen7/img-rep/blob/master/gihtest/3060ADBC-7B2F-487E-986C-6CB55CCE2C4A.jpg
    document.querySelector("#markdown").value = rep_uri.replace(".git", "/") + "raw/" + label + "/" + path + "/" + fileName;
}

function gitExec(command, path) {
    execSync(command, {cwd: path}, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            throw err
        }
        console.log(command)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    })
}