const { execSync } = require('child_process');
function gitCommitAndPush(fileName) {
    // add && commit && push
    commandExec('git add .', setting.local_folder)
    commandExec('git commit -m "' + fileName + '"', setting.local_folder)
    var beginTime = +new Date();
    commandExec('git push -u ' + setting.origin_name + ' ' + setting.label, setting.local_folder)
    var endTime = +new Date();
    console.log("git push用时" + (endTime - beginTime) + "ms");
}

function commandExec(command, path) {
    execSync(command, { cwd: path })
}

const fs = require("fs");
var path = require("path");
var setting = JSON.parse(localStorage.getItem("setting"))
if (setting == null) {
    location.href = './setting.html'
}

$("#update").on("click", function () {
    // git pull
    $(".loader-wrap").show();
    commandExec('git pull', setting.local_folder)
    $(".loader-wrap").hide();
    alert('更新成功');
})

$('body').on('mouseenter', '.clicker', function () {
    var img_url = $(this).parent().nextAll().find('#res_img').data('url');

    if (img_url != '' && img_url != undefined && $(this).attr('data-url') != 1) {
        $(this).prop('src', img_url);
        $(this).attr('data-url', 1);
    }
}).on("click", '.clicker', function () {
    $('#input').trigger('click');
});

$('#input').change(function () {
    var f = document.querySelector('#input');
    if (f.value != "") {
        var result = upload(f.files[0].path);

        // 异步执行git操作和渲染
        setTimeout(function () {
            gitCommitAndPush(result.fileName)
            render(result.url)
        }, 0)

        f.value = null;
    } else {
        alert('未选择图片哦')

    }
})

function upload(srcPath) {
    $(".loader-wrap").show();
    var prefix = uuid();
    var suffix = srcPath.substring(srcPath.indexOf("."));
    var targetFolder = setting.local_folder + fileSeparator() + setting.path;
    var fileName = prefix + suffix;
    var targetFile = targetFolder + fileSeparator() + fileName;
    mkdirsSyncIfNecessary(targetFolder)
    fs.writeFileSync(targetFile, fs.readFileSync(srcPath));
    return {
        "url": setting.rep_uri + "/raw/" + setting.label + "/" + setting.path + "/" + fileName,
        "fileName": fileName
    };
}

function render(result) {
    $("#res_img").val(result)
    $('#res_html').val('<img src="' + result + '"/>');
    $('#res_ubb').val('[IMG]' + result + '[/IMG]');
    $('#res_md').val('![](' + result + ')');
    $('.single-model img').prop('src', '1x1.png');
    $('.single-model img').css('background-image', 'url(' + result + ')');
    $('.single-model img').css('border', 'none');
    $('.single-model img').css('background-position', 'center');
    $('.file-info').css('display', 'inline-block');
    $(".btn-copy").removeClass("disabled");
    $(".loader-wrap").hide();
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

// 拖拽
document.querySelector("#uploadPlaceHolder").addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    var result = upload(e.dataTransfer.files[0].path);
    setTimeout(function () {
        gitCommitAndPush(result.fileName)
        render(result.url)
    }, 0)
    // for (const f of e.dataTransfer.files) {
    //     upload(f.path)
    // }
});
document.querySelector("#uploadPlaceHolder").addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

//HTML5 paste http://www.zhihu.com/question/20893119
$("#res_img").on("paste", function (e) {
    var oe = e.originalEvent;
    var clipboardData, items, item;
    if (oe && (clipboardData = oe.clipboardData) && (items = clipboardData.items)) {
        var b = false;
        var img_file = [];
        for (var i = 0, l = items.length; i < l; i++) {
            if ((item = items[i]) && item.kind == 'file' && item.type.match(/^image\//i)) {
                b = true;
                img_file.push(item.getAsFile());
            }
        }

        if (img_file.length != 0) {
            $(".loader-wrap").show();
            pasteUpload(img_file[0]);

        }

        function pasteUpload(file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                var orginName = file.name;
                var base64 = e.target.result;
                var base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
                var dataBuffer = new Buffer(base64Data, 'base64');

                var prefix = uuid();
                var suffix = orginName.substring(orginName.indexOf("."));
                var targetFolder = setting.local_folder + fileSeparator() + setting.path;
                var fileName = prefix + suffix;
                var targetFile = targetFolder + fileSeparator() + fileName;
                mkdirsSyncIfNecessary(targetFolder)
                fs.writeFileSync(targetFile, dataBuffer);
                var url = setting.rep_uri + "/raw/" + setting.label + "/" + setting.path + "/" + fileName
                gitCommitAndPush(fileName)
                render(url)
            };
        }

    }
});

$(".btn-copy,.btn-batchcopy").hover(
    function () {
        $(this).removeAttr('data-tooltip');
    },
    function () {
        $(this).blur();
    }
);
//单图模式下的"复制"按钮,添加点击事件
$(".btn-copy").on("click", function () {
    event.preventDefault();
    $(this).prev().select();
    var dataToCpy = $(this).prev().val();
    document.execCommand('copy');
    $(this).attr("data-tooltip", "复制成功"); //data-tooltip="复制成功"
    document.getSelection().removeAllRanges();
});

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

