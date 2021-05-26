async function connect() {
    try {
        const mysql = require("mysql2/promise")

        if (global.connection && global.connection.state !== "disconnected") return global.connection;
        
        const connection = await mysql.createConnection("mysql://root:@localhost:3306/db_crud_app")
        console.log("Connected in MySQL")
        global.connection = connection

        return connection
    }
    catch (error) {
        console.log("Error. Try again!", "\n", error)
    }
}

async function insert(data) {
    try {
        const conn = await connect()

        const [ tb_data ] = await conn.query("SELECT * FROM tb_register")

        for (let i = 0; i < tb_data.length; i++) {
            if (data.email === tb_data[i].email || data.phone === tb_data[i].phone) return true
        }

        const sql = "INSERT INTO tb_register(name, email, phone, title, date) VALUES(?, ?, ?, ?, ?)"
        const values = [data.name, data.email, data.phone, data.title, data.date]

        await conn.query(sql, values)
    }
    catch (error) {
        console.log("Error. Try again!", "\n", error)
    }
}

async function select() {
    try {
        const conn = await connect()
        return await conn.query("SELECT * FROM tb_register")
    }
    catch (error) {
        console.log("Error. Try again!", "\n", error)
    }
}

async function update(data) {
    try {
        const conn = await connect()
        const sql = "UPDATE tb_register SET name = ?, phone = ?, title = ?, date = ? WHERE email = ?"
        const values = [data.name, data.phone, data.title, data.date, data.email]

        if (await conn.query(sql, values)) return true
        else return false
    }
    catch (error) {
        console.log("Error. Try again!", "\n", error)
    }
}

async function del(data) {
    try {
        const conn = await connect()
        const sql = "DELETE FROM tb_register WHERE id = ?"
        const values = [data.id]

        if (await conn.query(sql, values)) return true
        else return false
    }
    catch (error) {
        console.log("Error. Try again!", "\n", error)
    }
}

connect()

module.exports = { insert, select, update, del }