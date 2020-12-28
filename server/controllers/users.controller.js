const users = [
    {
        id: '1',
        name: "Minh"
    },
    {
        id: '2',
        name: "Quang"
    },
    {
        id: '3',
        name: "Minh"
    },
    {
        id: '4',
        name: "Minh"
    },
    {
        id: '5',
        name: "Minh"
    },
    {
        id: '6',
        name: "Minh"
    },
]

module.exports.getUsers = (req, res) => {
    res.render('users', {users})
}

module.exports.getUsersByID = (req, res) => {
    const { id } = req.params
    res.send(`<h3 style="color:tomato;">ID: ${id}!</h3>`)
}