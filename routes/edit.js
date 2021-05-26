const express = require("express")
const database = require("../models/database")
const router = express.Router()

router.route("/")
    .post((req, res) => {
        const name = req.body.editName
        const email = req.body.editEmail
        const phone = req.body.editPhone
        const title = req.body.editTitle
        const date = new Date().toLocaleString()

        if (name.length <= 0 || email.length <= 0 || phone.length <= 0 || title.length <= 0) {
            res.emit("error")
        }
        else {
            dataUpdate(name, email, phone, title, date, res)
        }
    })

async function dataUpdate(name, email, phone, title, date, res) {
    const config = {
        name: name,
        email: email,
        phone: phone,
        title: title,
        date: date
    }
    
    if(await database.update(config)) {
        res.redirect("/")
    }
    else {
        res.emit("error")
    }
}

module.exports = router