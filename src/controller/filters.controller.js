const mysql2 = require("mysql2");
const { connection } = require("../database");

const getNovedades = (req, res) => {
  connection.query(
    "SELECT business.*, users.name AS providerName, users.surname AS providerSurname, users.photo AS userPhoto, service.price, service.description FROM business JOIN users ON business.provider = users.id_user JOIN service ON business.id_business = service.id_business WHERE business.rating >= 4",
    (error, results) => {
      if (error) {
        console.log("Error querying the database", error);
        res.status(500).send("Error querying the database");
        return;
      }
      res.json(results);
    }
  );
};

const getResults = (req, res) => {
  const searchTerm = req.query.searchTerm;

  connection.query(
    "SELECT * FROM business WHERE title LIKE ?",
    [`%${searchTerm}%`],
    (error, results) => {
      if (error) {
        console.log("Error querying the database", error);
        res.status(500).send("Error querying the database");
        return;
      }
      res.json(results);
    }
  );
};

module.exports = { getNovedades, getResults };
