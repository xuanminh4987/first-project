const fs = require("fs")

function readFile(){
    fs.readFile('./html/home.html', 'utf8', (err, data) => {
        if(err) throw err

        return data
    })
}

function readFileSync(){
    const data = fs.readFileSync('./html/home.html', 'utf-8')
    
    return data
}

module.exports = {
    readFile,
    readFileSync
}