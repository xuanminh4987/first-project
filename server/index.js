
//  REQUIRE EXPRESSJS
const express = require('express')

const { readFile, readFileSync } = require('./controllers/home.controller')

const usersRoute = require('./routes/users.route')
const postsRoute = require('./routes/posts.route')
const loginRoute = require('./routes/login.route')

//  ASSIGN APP VARIABLE AND CREATE SERVER
const app = express()
const port = 3000

//  
app.set('view engine', 'pug')
app.set('views', './views')

app.use('/' ,(req, res, next) => {
  console.log(`The request received at: `, new Date());
  next()
})

app.use(express.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  res.render('home')
})

app.use('/users', usersRoute)
app.use('/posts', postsRoute)
app.use('/login', loginRoute)

app.get('*', (req, res) => {
  res.send('<h3 style="color:tomato;">404 NOT FOUND!</h3>')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})