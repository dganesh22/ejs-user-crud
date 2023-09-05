const userRoute = require('express').Router()
const {index, create, edit,addUser, allUsers, singleUser, updateUser, deleteUser, pnf } = require('../controller/user_controller')


userRoute.get(`/`,index)
userRoute.get(`/user/add`, create)
userRoute.get(`/user/edit`, edit)

// api routes
userRoute.post(`/api/user/new`, addUser)
userRoute.get(`/api/user/all`, allUsers)
userRoute.get(`/api/user/:id`, singleUser)
userRoute.patch(`/api/user/:id`, updateUser)
userRoute.delete(`/api/user/:id`, deleteUser)


// default route
userRoute.all(`/*`, pnf)

module.exports = userRoute