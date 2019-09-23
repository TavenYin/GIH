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