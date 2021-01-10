//  REQUIRE
const fs = require('fs');
const path = require('path');

// CREATE VAR
let posts = [
    {
        id: "1",
        title: "What is Lorem Ipsum?",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        author: "Minh"
    },
    {
        id: "2",
        title: "Why do we use it?",
        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        author: "Minh"
    },
    {
        id: "3",
        title: "Where does it come from?",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor purus eget diam varius placerat. Donec quis orci auctor, bibendum purus quis, rhoncus nibh. Proin consectetur urna vitae metus egestas congue. Sed facilisis, orci id facilisis ornare, ante quam dictum turpis, sit amet molestie eros purus ac odio. Pellentesque habitant.",
        author: "Minh"
    },
    {
        id: "4",
        title: "Where can I get some?",
        content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        author: "Minh"
    }
]

module.exports.getPosts = (req, res) => {
    res.render('posts', {posts})
}

module.exports.getForm = (req, res) => {
    fs.readFile(`${path.dirname(path.dirname(__dirname))}/client/jquery-post.html`, (err, html) => {
        if(err) throw err

        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);
        res.end();
    })
}

module.exports.pushPost = (req, res) => {
    const id = +posts.length + 1
    const title = req.body.title
    const content = req.body.content
    const author = req.body.author

    posts.push({
        id,
        title,
        content,
        author
    })
    console.log(posts);
    res.redirect('/posts')
}

module.exports.getPostByID = (req, res) => {
    const { id } = req.params
    for(let post of posts){
        if(post.id == id){
            return res.send(`
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <p>Author: ${post.author}</p>
                <a href="http://localhost:3000/posts">Undo</a>
            `)
        }
    }

    res.send(`Cant get POST by ID: ${id}.`)
}

module.exports.updateContentByID = (req, res) => {
    const { id, content } = req.params
    for(let post of posts){
        if(id == post.id){
            post.content = content
            return res.send('Updated.')
        }
    }
    
    res.send(`Cant get POST by ID: ${id}.`)
}

module.exports.deletePostByID = (req, res) => {
    const { id } = req.params
    for(let post of posts){
        if(id == post.id){
            post.id = undefined
            delete title
            delete post.content
            delete post.author
            res.send('SUCCESSFUL!')
        }
    }
    res.send(`Cant get POST by ID: ${id}.`)
}