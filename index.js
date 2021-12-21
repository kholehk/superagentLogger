const superAgent = require('superagent')

const main = async () => {
    const response = await superAgent.logLevel('kassa24')
        .get('https://rickandmortyapi.com/api/character/2')
        .set({level: 'general'})
        .catch(error => console.log(error))
}

main()
