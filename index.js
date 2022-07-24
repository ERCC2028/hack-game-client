//imports
const WebSocket = require('websocket').w3cwebsocket;
const fs = require('fs');
const {ansi, mod, color} = require('./ansi')

//readline declaration
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

//ANSI colors
const inputAnsi = mod.default + color(color.intense(color.green));
const outputAnsi = mod.default + mod.italics + color(color.green);
const msgAnsi = mod.default + color(color.intense(color.green)) + mod.bold;
const promptAnsi = mod.default + color(color.green) + mod.bold;

if(process.argv.length > 2) connect(process.argv[2], process.argv[3])
else welcome();

function welcome() {
    console.log(inputAnsi + mod.bold + mod.italics + `Welcome to ${mod.default + mod.bold + color(color.black, color.red)}HackGame` + inputAnsi);
    readline.question(promptAnsi + `Insert Server ${mod.italics}IP Adress${promptAnsi}: ` + inputAnsi, ip => {
        connect(ip);
    });
}

//variables
/**
 * @type {WebSocket}
 */
var socket;
/**
 * @type {string}
 */
var serverName;
/**
 * @type {string}
 */
var playerCode;
/**
 * @type {Map<string, (string[], (string) => void) => string>}
 */
var clientCommands = new Map(Object.entries(require('./client_commands')));

const gameFolder = 'Client'


/**
 * 
 * @param {string} ip WebSocket address
 * @param {*} playerCode 
 */
function connect(ip, playerCode) {
    if(playerCode === undefined) {
        readline.question(promptAnsi + `Enter your ${mod.italics}Player Code${promptAnsi}: ` + inputAnsi, res => {
            connect(ip, res);
        });
        return;
    }
    console.log(`Connecting ws://${ip}`)
    socket = new WebSocket('ws://' + ip);
    
    socket.onopen = onOpen;
    socket.onmessage = onMessage;
    socket.onclose = onClose;
    socket.onerror = onError;
}

function game() {
    readline.question(promptAnsi + '$ ' + inputAnsi, command => {
        if(command.startsWith('#')) clientCommands.get(command.substring(1).split(' ')[0])(command.substring(1).split(' ').slice(1), socket.send);
        else socket.send(command);
        game();
    });
}

function createLauncher() {
    if(process.platform === 'win32') {

    } else {
        fs.writeFileSync('../launchers/' + serverName + '.sh', `node ../${gameFolder}/index.js
        `)
    }
}

function onOpen(event) {
    socket.send('hi');
    game();
}

function onMessage(event) {

}

function onClose(event) {
    readline.question(promptAnsi + `Do you want to create a ${mod.italics}Launcher${promptAnsi} for this server ? (y/N): ` + inputAnsi, () => {

    });
}

function onError(event) {
    console.error(event);
}