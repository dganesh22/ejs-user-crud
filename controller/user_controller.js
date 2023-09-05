
// model name
const User = require('../model/user_model')

// controller

// view the index.ejs
let index = (req,res) => {
    return res.render('index.ejs')
}

// create.ejs
let create = (req,res) => {
    return res.render('create.ejs')
}

// update.ejs
let edit = (req,res) => {
    return res.render('update.ejs')
}


// api - add new user (post)
let addUser = async (req,res) => {
    try {
        // check if email exists 
         let extEmail = await User.findOne({ email: req.body.email })
            if(extEmail) 
                return res.status(400).json({ msg: `${req.body.email} already exists`})

                // check if mobile number exists
        let extMobile = await User.findOne({ mobile: req.body.mobile })
                if(extMobile) 
                    return res.status(400).json({ msg: `${req.body.mobile} already exists`})

            // create new user
        let newUser = await User.create(req.body)
            
        res.status(200).json({ msg: "New user created Successfully", user: newUser })
    }catch(err) {
        return res.status(500).json({ msg: err.message })
    }
}

// api - read all users data (get)
let allUsers = async (req,res) => {
    try {
        let users = await User.find({})

        res.status(200).json({ length: users.length, users })
    }catch(err) {
        return res.status(500).json({ msg: err.message })
    }
}


// api - read all users data (get)
let singleUser = async (req,res) => {
    try {
        let id = req.params.id 
        
        let single = await User.findById({ _id: id })
            if(!single)
                return res.status(404).json({ msg: `Requested user id not found`})

        res.status(200).json({user: single })

    }catch(err) {
        return res.status(500).json({ msg: err.message })
    }
}


// api - update user (patch)
let updateUser = async (req,res) => {
    try {
        let id = req.params.id
        
         // check if email exists 
         let extEmail = await User.findOne({ email: req.body.email })
            if(extEmail) 
                return res.status(400).json({ msg: `${req.body.email} already exists`})

                // check if mobile number exists
        let extMobile = await User.findOne({ mobile: req.body.mobile })
                if(extMobile) 
                    return res.status(400).json({ msg: `${req.body.mobile} already exists`})

            await User.findByIdAndUpdate({_id: id }, req.body)

        res.status(200).json({ msg: "user info updated successfully"})
    }catch(err) {
        return res.status(500).json({ msg: err.message })
    }
}


// api - delete user (delete)
let deleteUser = async (req,res) => {
    try {
        let id = req.params.id

        let extUser = await User.findById({ _id: id })
            if(!extUser)
                return res.status(404).json({ msg: `Requested id not found`})

            await User.findByIdAndDelete({ _id: id })

        res.status(200).json({ msg: "User info deleted successfully"})
    }catch(err) {
        return res.status(500).json({ msg: err.message })
    }
}


// pnf.ejs
let pnf = (req,res) => {
    return res.render('pnf.ejs')
}

module.exports = { index, create, edit, addUser, allUsers, singleUser, updateUser, deleteUser, pnf }