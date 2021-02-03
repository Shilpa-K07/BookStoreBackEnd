const userModel = require("../models/user")

const util = require("../utility/util")
class UserService {
    register = (userData, callBack) => {
        util.encryptData(userData.password, (error, encryptedData) => {
            if (error)
                throw new Error("Error while encrypting password")
            userData.password = encryptedData
            userModel.save(userData, (error, data) => {
                if (error)
                    return callBack(error, null)
                return callBack(null, data)
            })
        })

    }
}
module.exports = new UserService();