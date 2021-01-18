
//  REQUIRE EXPRESSJS
const express = require('express')
const path = require('path')
const cors = require('cors')

const usersRoute = require('./routes/users.route')
const postsRoute = require('./routes/posts.route')
const loginRoute = require('./routes/login.route')
const getFormRoute = require('./routes/getForm.route')

//  ASSIGN APP VARIABLE AND CREATE SERVER
const app = express()
const port = 3000

//  
app.set('view engine', 'pug')
app.set('views', './views')

app.use(cors())
app.use('/' ,(req, res, next) => {
  console.log(`The request received at: `, new Date());
  next()
})

app.use(express.urlencoded({
  extended: true
}))
app.use(express.static(path.dirname(__dirname) + '/client/js'))

app.get('/', (req, res) => {
  res.render('home')
})
app.get('/js/jquery-3.5.1.js', (req,res) => {
  res.sendFile(path.dirname(__dirname) + '/client/js/jquery-3.5.1.js');
});
app.get('/js/jquery-post.js', (req, res) => {
  res.sendFile(path.dirname(__dirname) + '/client/js/jquery-post.js');
})
app.use('/users', usersRoute)
app.use('/posts', postsRoute)
app.use('/login', loginRoute)
app.use('/form', getFormRoute)

app.get('*', (req, res) => {
  res.send('<h3 style="color:tomato;">404 NOT FOUND!</h3>')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})