/**
 * @description Defining routes
 * @methods post, put are the http methods
 */
module.exports = (app) => {
    const user= require('../controllers/user.js')
    const bucket = require('../../server').bucket
    var id = "12234"
    app.post('/registration', /*  (req, res) => {
        var document = {
          name: req.body.name
        }
        bucket.collection().insert(id,document, (error, result) => {
          if(error){
            return res.status(400).send(error)
          }
          res.status(200).send(result)
        })
} */ user.register)
}