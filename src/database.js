const mysql = require('mysql2');
const { S3Client } = require('@aws-sdk/client-s3');

// Create an S3 client
const s3Client = new S3Client({
  region: 'eu-west-3',
  credentials: {
    accessKeyId: 'AKIA3FZLB74P2IONL6Y5',
    secretAccessKey: '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',
  },
});

const pool = mysql
  .createPool({
    host:
      process.env.DB_HOST || 'hirun.cxnp8cr5xgbf.eu-north-1.rds.amazonaws.com',
    user: process.env.DB_USER || 'hirun_admin',
    password: process.env.DB_PASSWORD || '2P1^u3h0go',
    database: process.env.DB_DATABASE || 'hirun',
    port: process.env.DB_PORT || 3306,
    multipleStatements: true,

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
