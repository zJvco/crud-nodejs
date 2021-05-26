const express = require("express")
const database = require("../models/database")
const router = express.Router()

router.route("/")
    .post((req, res) => {
        const id = req.body.id

        dataDelete(id, res)
    })

async function dataDelete(id, res) {
    if (await database.del({ id: id })) {
        res.json({msg: "sucess"})
    }
    else {
        res.emit("error")
    }
}

module.exports = router