const bucket = require('../../server').bucket
const uuid = require('uuid').v4

class UserModel {
    save = (userData, callBack) => {
          const id = uuid()
          bucket.collection().insert(id, userData, (error, result) => {
            if(error)
              return callBack(error, null)
            return callBack(null, result)
          })
    }
}
module.exports = new UserModel();