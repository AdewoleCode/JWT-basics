
const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {

    const {username, password} = req.body

    if(!username || !password){
        throw new CustomAPIError('please provide username and password', 400)
    }

    // for demo purpose, you usually get ID from the database
    const id = new Date().getDate()

    // try to keep the payload you pass to the object as small as possible. big payloads affects perftormance
    // THE JWT string should be a long complex unguessable string.

    const token = jwt.sign({username, id}, process.env.JWT_SECRET, {expiresIn: '30d'} )

    // res.send('login route')
    res.status(200).json({msg: 'user created', token})
}

const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization
    console.log(authHeader, 'controller');

    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('no token or invalid token', 401)
    }


    //to create an array of [bearer, tokenvalue]
     const token = authHeader.split(' ')[1]

     try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const luckyNumber = Math.floor(Math.random() * 100 )
        res.status(200).json({msg: `hello, ${decoded.username}`, secret: `your lucky number is ${luckyNumber}`})

     } catch (error) {
        throw new CustomAPIError('not authorized to access this route', 401)
     }

}


module.exports = {login, dashboard}