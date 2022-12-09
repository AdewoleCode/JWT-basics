


const login = async (req, res) => {

    const {username, password} = req.body


    console.log(username, password);
    res.send('login page')
}

const dashboard = async (req, res) => {

    const luckyNumber = Math.floor(Math.random() * 100 )
    res.status(200).json({msg: `hello, john doe`, secret: `your lucky number is ${luckyNumber}`})
}


module.exports = {login, dashboard}