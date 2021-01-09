const fs = require('fs');

module.exports.getPosts = (req, res) => {
    fs.readFile('../client/jquery-post.html', (err, html) => {
        if(err) throw err

        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end();  
    })
}

module.exports.postPost = (req, res) => {
    const title = req.body.title
    const content = req.body.content
    const author = req.body.author

    console.log(content);
    console.log(title);
    console.log(author);
}