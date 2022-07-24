exports.ansi = function(endCode, ...args) {
    let str = '';
    args.forEach(v => {
        str = str + ';' + v;
    });
    return '\u001B[' + str.substring(1) + endCode;
}

exports.color = function(foreground, background) {
    if(background === undefined) return '\u001B[' + foreground + 'm';
    else return '\u001B[' + foreground + ';' + (background + 10) + 'm';
}

exports.color.black     = 30;
exports.color.red       = 31;
exports.color.green     = 32;
exports.color.yellow    = 33;
exports.color.blue      = 34;
exports.color.magenta   = 35;
exports.color.cyan      = 36;
exports.color.white     = 37;

exports.color.intense = function(val) {
    return val + 60;
}
exports.color.background = function(val) {
    return val + 10;
}

exports.mod = {
    default: '\u001B[0m',
    bold: '\u001B[1m',
    thin: '\u001B[2m',
    italics: '\u001B[3m',
    underline: '\u001B[4m',
    blink: '\u001B[5m',
    highlight: '\u001B[7m',
    invisible: '\u001B[8m',
}

//\x1b