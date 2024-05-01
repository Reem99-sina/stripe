const mongoose = require("mongoose");
module.exports.connectdb = () => {
    return mongoose.connect(process.env.MONGODB).then(() => {
        console.log("done connect to database")
    }).catch((error) => {
        console.log("error in connect", error)
    })
}