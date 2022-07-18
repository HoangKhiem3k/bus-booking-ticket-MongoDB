const {User} = require('../../../models/User')
const bcrypt = require('bcryptjs')
const {promisify} = require('util') // xu li bien callback thanh promise
const jwt = require('jsonwebtoken')

const genSalt = promisify(bcrypt.genSalt)
const hash = promisify(bcrypt.hash)

const createUser = (req,res,next ) => {
    const {email,password,fullName} = req.body;
    const newUser = new User({email,password,fullName})
    
    User.findOne({email})
        .then(user => {
            if (user) return Promise.reject({ status: 404, message: 'User already exists' })
            return genSalt(10)
        })
        .then(salt => hash(password, salt))
        .then(hash => {
            newUser.password = hash
            return newUser.save()
        })
        .then(user => {
            res.status(201).json({
                message: 'User created successfully',
                user
            })
        })
        .catch(err => {
            if(err.status) return res.status(err.status).json({ message: err.message })
            return res.status(500).json(err)
        })
}

const comparePassword = promisify(bcrypt.compare)
const jwtSign = promisify(jwt.sign)
const login = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user =>{
            if (!user) return Promise.reject({ status: 404, message: 'User not found' })
            return Promise.all([comparePassword(password, user.password), user])
        })
        .then(res => {
            const isMatch = res[0]
            const user = res[1]
            if (!isMatch) return Promise.reject({ status: 401, message: 'Incorrect password' })
            const payload = {
                email: user.email,
                userType: user.userType
            }
            return jwtSign(
                payload, 'secret', { expiresIn: '1h' }
            )   
        })
        .then(token => {
            res.status(200).json({
                message: "Login successful",
                token
            })
        })
        .catch(err => {
            if(err.status) return res.status(err.status).json({ message: err.message })
            return res.status(500).json(err)
        })
}
module.exports = {
    createUser,
    login
}