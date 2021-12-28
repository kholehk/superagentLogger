const superAgent = require('superagent')
const express = require('express')
const multer = require('multer')
const path = require('path')

const PORT = process.env.PORT || 3000

const upload = multer({ dest: 'uploads' })

const app = express()

app.use(express.static('public'))

app.use(express.json())

app.post('/upload'
    , upload.single('file')
    , async (req, res) => res.sendStatus(200)
)

app.listen(PORT, null, console.log(`Server has been started on port: ${PORT} ...`))

const main = async () => {
    const response = await superAgent
        // .get('https://rickandmortyapi.com/api/character/2')
        .post(`http://localhost:${PORT}/upload`)
        // .post('/upload')
        .attach('file', path.join(process.cwd(), 'sample/drv.lic.kgz.jpg'))
        .field('secretKey', 987654321)
        // .send({})
        .catch(error => error)
    
    console.log(JSON.stringify({'mainLog':response}, null, 2));
}

main()
