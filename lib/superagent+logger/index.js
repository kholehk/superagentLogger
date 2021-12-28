const Superagent = require('superagent')

const requestLog = (req) => { 
    const { method, url, formData, headers } = req

    console.log(JSON.stringify({ 'requestLog': req }, null, 2));
}

const responseLog = (res) => {
    const { status, body, files } = res
    console.log(JSON.stringify({ 'responseLog': res }, null, 2))
}

const errorLog = (err) => {
    // const { status, message, response } = err
    console.log(JSON.stringify({ 'errorLog': err }, null, 2))
}

function Smith() {

    return Superagent(...arguments)
        .on('request', requestLog)
        .on('response', responseLog)
        .on('error', errorLog)
}

Object.setPrototypeOf(Smith, Superagent)
const _Smith = {}
for (const key in Superagent) { 

    if (!Superagent.hasOwnProperty(key) || typeof Superagent[key] !== 'function') continue

    _Smith[key] = function () {
        return Superagent[key](...arguments)
            .on('request', requestLog)
            .on('response', responseLog)
            .on('error', errorLog)
    }
}

module.exports = Object.assign(Smith, _Smith)

console.log('Hello Mr. Anderson')
