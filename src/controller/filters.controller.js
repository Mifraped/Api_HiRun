const mysql2 = require("mysql2");

const { pool } = require("../database");

const testDbConnection = (req, res) => {
  pool
    .query("SELECT 1 + 1 AS solution")
    .then(([results, fields]) => {
      res.send("The solution is: " + results[0].solution);
    })
    .catch((error) => {
      console.log("Error querying the database", error);
      res.status(500).send("Error querying the database");
    });
};

const getNovedades = (req, res) => {
  pool
    .execute(
      "SELECT business.*, users.name AS providerName, users.surname AS providerSurname, users.photo AS userPhoto, service.price, service.description FROM business JOIN users ON business.provider = users.id_user JOIN service ON business.id_business = service.id_business WHERE business.rating >= 4"
    )
    .then(([results, fields]) => {
      res.json(results);
    })
    .catch((error) => {
      console.log("Error querying the database", error);
      res.status(500).send("Error querying the database");
    });
};

const getResults = (req, res) => {
  const searchTerm = req.query.searchTerm || "";
  const rating = req.query.rating;

  console.log("searchTerm:", searchTerm);
  console.log("rating:", rating);

  console.log("Query parameters:", req.query);

  let query = `SELECT business.*, users.name AS providerName, users.surname AS providerSurname, users.photo AS userPhoto, service.price, service.description FROM business JOIN users ON business.provider = users.id_user JOIN service ON business.id_business = service.id_business WHERE 1=1`;
  let queryParams = [];

  if (searchTerm.trim() !== "") {
    query += ` AND business.title LIKE ?`;
    queryParams.push(`%${searchTerm}%`);
  }

  if (rating) {
    query += ` AND business.rating = ?`;
    queryParams.push(rating);
  }

  pool
    .execute(query, queryParams)
    .then(([results, fields]) => {
      res.json(results);
    })
    .catch((error) => {
      console.log("Error querying the database", error);
      res.status(500).send("Error querying the database");
    });
};

module.exports = { testDbConnection, getNovedades, getResults };
