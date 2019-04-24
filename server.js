const express = require('express')
const fs = require('fs')
const reqPromise = require('request-promise')
const app = express()
const bodyParser = require('body-parser')

app.use(express.json())

app.listen(8080, () => {
    console.log('Server running on port 8080')
})

app.get('/',(req,res) => {
    res.send('Hello World')
})

app.get('/updateJson', (req,res) => {
    var reqObject = {
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'GET'
    }
    reqPromise(reqObject).then(response => {
        fs.writeFile('posts.json',response, err => {
            if(err){
                res.status(500).send('Error')
                return
            }
            res.send('Done')
        })
    })
})

app.get('/getJson', (req,res) => {
    fs.readFile('posts.json',(err, data) => {
        const finalData = JSON.parse(data)
        res.send(finalData)
    })
})

app.post('/body', (req,res) => {
    res.send(`Hello ${req.body.name}`)
})