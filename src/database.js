const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "hirun.cxnp8cr5xgbf.eu-north-1.rds.amazonaws.com",
    user: process.env.DB_USER || "hirun_admin",
    password: process.env.DB_PASSWORD || "dYrW59fz4<0",
    database: process.env.DB_DATABASE || "hirun",
    port: process.env.DB_PORT || 3306
})

module.exports = {connection}