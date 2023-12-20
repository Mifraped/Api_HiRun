const mysql = require("mysql2");

const testConnection = (req, res, next) => {
  connection.query("SELECT 1", (error, results) => {
    if (error) {
      console.log("Error querying the database", error);
      res.status(500).send("Error querying the database");
      return;
    }
    res.send("Database connection works!");
  });
};

// const ddbbConfig = require("../ddbbConfig");

const pool = mysql
  .createPool({
    host:
      process.env.DB_HOST || "hirun.cxnp8cr5xgbf.eu-north-1.rds.amazonaws.com",
    user: process.env.DB_USER || "hirun_admin",
    password: process.env.DB_PASSWORD || "2P1^u3h0go",
    database: process.env.DB_DATABASE || "hirun",
    port: process.env.DB_PORT || 3306,
  })
  .promise();
// .promise();
//dejo comentado por si no os funciona
// const connection = mysql
// 	.createConnection({
// 		host: ddbbConfig.host,
// 		user: ddbbConfig.user,
// 		password: ddbbConfig.password,
// 		database: ddbbConfig.database,
// 		port: process.env.DB_PORT || 3306,
// 	})
// 	.promise();

module.exports = { pool, testConnection };
