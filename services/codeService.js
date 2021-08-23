let client = require("../dbConnect");
let codesCollection;
setTimeout(() => {
    codesCollection = client.mongoClient.db().collection("codes");

}, 2000)

const getAllCodes = (res) => {
    codesCollection.find().toArray(function (err, result) {
        if (err) throw err;
        res.send(result)
    })
}

const insertCode = (code, res) => {
    codesCollection.insertOne(code, (err, result) => {
        console.log('Code Inserted', result)
        res.send({ result: 200 })
    })
}



module.exports = {
    getAllCodes, insertCode
}