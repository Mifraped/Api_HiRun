const mysql = require("mysql2");
const { S3Client } = require("@aws-sdk/client-s3");
require('dotenv').config();


// Create an S3 client
const s3Client = new S3Client({
  region: "eu-west-3",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const pool = mysql
  .createPool({
    host:
      process.env.DB_HOST || "hirun.cxnp8cr5xgbf.eu-north-1.rds.amazonaws.com",
    user: process.env.DB_USER || "hirun_admin",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || "hirun",
    port: process.env.DB_PORT || 3306,
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 300,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
  })
  .promise();

// const ddbbConfig = require("../ddbbConfig");

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

module.exports = { pool, s3Client };
