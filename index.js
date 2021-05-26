const express = require("express")
const { join } = require("path")
const index = require("./routes/index")
const edit = require("./routes/edit")
const remove = require("./routes/remove")

const app = express()
const PORT = 8080 || process.env.PORT

app.use(express.static(join(__dirname, "/public")))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/", index)
app.use("/edit", edit)
app.use("/remove", remove)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})