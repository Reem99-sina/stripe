const mongoose = require("mongoose");
module.exports.connectdb = () => {
    return mongoose.connect("mongodb+srv://reem:Reemebrahim99@cluster0.kplmx2s.mongodb.net/test").then(() => {
        console.log("done connect to database")
    }).catch((error) => {
        console.log("error in connect", error)
    })
}