const express = require("express")
const router = express.Router()
const { insert, select } = require("../models/database")

router.route("/")
    .get((req, res) => {
        dataSelect()
            .then(data => {
                res.render("index", { data: data, sucess: true })
            })
            .catch(() => res.emit("error"))
    })
    .post((req, res) => {
        const name = req.body.name
        const email = req.body.email
        const phone = req.body.phone
        const title = req.body.title
        const date = new Date().toLocaleString()

        if (name.length <= 0 || email.length <= 0 || phone.length <= 0 || title.length <= 0) {
            dataSelect()
                .then(data => {
                    res.render("index", { msg: "Fill the form to continue", data: data, sucess: true })
                })
                .catch(() => res.emit("error"))
        }
        else {
            dataInsert(name, email, phone, title, date, res)
        }
    })

async function dataInsert(name, email, phone, title, date, res) {
    const config = {
        name: name,
        email: email,
        phone: phone,
        title: title,
        date: date
    }

    if (await insert(config)) {
        dataSelect()
            .then(data => {
                res.render("index", { msg: "Email or Phone already exists", data: data, sucess: true })
            })
            .catch(() => res.emit("error"))
    }
    else {
        dataSelect()
            .then(data => {
                res.render("index", { data: data, sucess: true })
            })
            .catch(() => res.emit("error"))
    }
}

async function dataSelect() {
    const [ column ] = await select()
    return column
}

module.exports = router