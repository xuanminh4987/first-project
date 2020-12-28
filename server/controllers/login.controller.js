const users = [
    {
        username: "xuanminh",
        password: "4987"
    }
]

module.exports.getLoginForm = (req, res) => {
    res.render('login')
}

module.exports.checkLogin = (req, res) => {
    for(let user of users){
        if(user.username == req.body.username.toLowerCase()){
            if(user.password == req.body.password){
                res.redirect('/users')
            } else{
                res.send("Wrong Password!")
            }
        } else{
            res.send("Wrong Username!")
        }
    }
    res.send("Checking")
}