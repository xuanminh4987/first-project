let posts = [
    {
        pID: "1",
        position: "PG",
        des: "The point guard runs the offense and usually is the team’s best dribbler and passer. The point guard defends the opponent’s point guard and tries to steal the ball."
    },
    {
        pID: "2",
        position: "SG",
        des: "The shooting guard is usually the team’s best shooter. The shooting guard can make shots from long distance and also is a good dribbler."
    },    
    {
        pID: "3",
        position: "SF",
        des: "The small forward plays against small and large players. They roam all over on the court. Small forwards can score from long shots and close ones."
    },    
    {
        pID: "4",
        position: "PF",
        des: "The power forward does many of the things a center does, playing near the basket while rebounding and defending taller players. But power forwards also take longer shots than centers."
    },    
    {
        pID: "5",
        position: "C",
        des: "The center is the tallest player on each team, playing near the basket. On offense, the center tries to score on close shots and rebound. But on defense, the center tries to block opponents’ shots and rebound their misses."
    },
]

module.exports.getPosts = (req, res) => {
    res.render('posts', {posts})
}

module.exports.getPostsByID = (req, res) => {
    const { pID } = req.params
    for(let post of posts){
        if(post.pID == pID){
            res.send(`Description: ${post.des}`)
        } else{
            res.send(`Dont have post by ID: ${pID}`)
        }
    }
}

module.exports.getPostsByPosition = (req, res) => {
    const { position } = req.params

    for(let val of posts){
        if(val.position == position.toUpperCase()){
            res.send(val.des)
        }
    }
}

module.exports.showPostByPosition = (req, res) => {
    const { des } = req.params
    res.send(`Description: ${des}`)
}

module.exports.addNewPost = (req, res) => {
    const { pID, position } = req.params
    res.send(`pID: ${pID} and position: ${position}`)
}

module.exports.updatePositionByID = (req, res) => {
    const { pID, position } = req.params
    for(let post of posts){
        if(pID == post.pID){
            res.send(`Position Before: ${post.position}. Position After: ${position.toUpperCase()}.`)
            post.position = position
        }
    }
}

module.exports.updateIDByPosition = (req, res) => {
    const { pID, position } = req.params
    for(let post of posts){
        if(position == post.position){
            res.send(`ID Before: ${post.pID}. ID After: ${pID - 1}.`)
            post.pID = pID
        }
    }
}

module.exports.delPostByID = (req, res) => {
    const { pID } = req.params
    posts.splice(pID - 1, 1)
    for(let post of posts){
        if(post.pID == pID){
            res.send(`DELETED: \n ID: ${pID}. \n Position: ${posts[pID].position}. \n Des: ${posts[pID].des}`)
        } else{
            res.send(`Dont have post by ID: ${pID}`)
        }
    }
}