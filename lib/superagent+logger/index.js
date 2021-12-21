const Superagent = require('superagent')

Superagent.logLevel = 'general'

function Smith(logLevel = 'general', ...rest) {

    SuperAgentRequest = Superagent(...rest) 
    SuperAgentRequest.logLevel = logLevel
    SuperAgentRequest
        .on('request', req => console.log(`\nRequest: `, req.logLevel))
        .on('response', res => console.log(`\nResponse: `, res.request.logLevel))
        .on('error', err => console.log(`\nError: `, Object.keys(err)))

    return SuperAgentRequest
}

Object.setPrototypeOf(Smith, Superagent)

for (const key in Smith) { 
    if (Smith.hasOwnProperty(key)) continue

    if (typeof Smith[key] === 'function') {
        Smith[key] = function () {
            return Superagent[key](...arguments)
                .on('request', req => console.log(`\nRequest: `, req.header))
                .on('response', res => console.log(`\nResponse: `, res.header))
                .on('error', err => console.log(`\nError: `, err.message, err.status))
        }
    }
}

module.exports = Object.assign(Smith)

console.log('Hello Mr. Anderson')
