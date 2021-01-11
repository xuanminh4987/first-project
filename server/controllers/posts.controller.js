//  REQUIRE
const fs = require('fs');
const path = require('path');
const { post } = require('../routes/posts.route');

//  CONNECT TO MONGO && INSERT NEW POST
function insertPost(post){
    const mongodb = require('mongodb');
    const MongoClient = mongodb.MongoClient
    const url = 'mongodb://localhost:27017/'

    MongoClient.connect(url, (err, client) => {
        if(err) throw err
        else{
            console.log('Connection established to', url)
            
            const db = client.db('first-db')
            const collection = db.collection('posts')

            collection.insert(post, (err, result) => {
                if(err) throw err
                
                console.log('Inserted post into the "posts" collection.' , result);
                client.close()
            })
        }
    })
}

function getAllPosts(callBack){
    const mongodb = require('mongodb');
    const MongoClient = mongodb.MongoClient
    const url = 'mongodb://localhost:27017/'
    let result = []

    MongoClient.connect(url, (err, client) => {
        if(err) throw err
        else{
            console.log('Connection established to', url)
            
            const db = client.db('first-db')
            const collection = db.collection('posts')

            const posts = collection.find({})
            posts.forEach(post => {
                result.push(post)
            }, () => {
                client.close()
                return callBack(result)
            })
        }
    })
}

function getPostByID_db(id ,callBack){
    const mongodb = require('mongodb');
    const MongoClient = mongodb.MongoClient
    const ObjectID = mongodb.ObjectID
    const oID = ObjectID(id)
    const url = 'mongodb://localhost:27017/'
    let result = []

    MongoClient.connect(url, (err, client) => {
        if(err) throw err
        else{
            console.log('Connection established to', url)
            
            const db = client.db('first-db')
            const collection = db.collection('posts')

            const posts = collection.find({_id: oID})
            posts.forEach(post => {
                result.push(post)
            }, () => {
                client.close()
                return callBack(result)
            })
        }
    })
}

function deletePostByID_db(id){
    const mongodb = require('mongodb');
    const MongoClient = mongodb.MongoClient
    const ObjectID = mongodb.ObjectID
    const oID = ObjectID(id)
    const url = 'mongodb://localhost:27017/'

    MongoClient.connect(url, (err, client) => {
        if(err) throw err
        else{
            console.log('Connection established to', url)
            
            const db = client.db('first-db')
            const collection = db.collection('posts')

            collection.remove({_id: oID})
        }
    })
}

// MODULE
module.exports.getPosts = (req, res) => {
    getAllPosts((posts) => {
        res.render('posts', {posts})
    })
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
    const title = req.body.title
    const content = req.body.content
    const author = req.body.author

    insertPost({
        title,
        content,
        author
    })

    res.redirect('/posts')
}

module.exports.getPostByID = (req, res) => {
    const { id } = req.params
    getPostByID_db(id, (post) => {
        res.send(`
            <h3>${post[0].title}</h3>
            <p>${post[0].content}</p>
            <p>Author: ${post[0].author}</p>
            <a href="http://localhost:3000/posts/del/${post[0]._id}">Delete</a>
            `)
    })
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
    deletePostByID_db(id)
    res.redirect('/posts')
}