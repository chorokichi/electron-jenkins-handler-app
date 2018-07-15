// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const os = require('os')
const homeDir = os.homedir()
document.getElementById('version-node-info').innerHTML = `Your node version is: ${process.versions.node}`
document.getElementById('version-chrome-info').innerHTML = `Your chrome version is: ${process.versions.chrome}`
document.getElementById('version-electron-info').innerHTML = `Your electron version is: ${process.versions.electron}`
document.getElementById('sys-info').innerHTML = `Your system home directory is: ${homeDir}`
