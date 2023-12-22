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

const getBestRated = (req, res) => {
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

const getNovedades = (req, res) => {
  pool
    .execute(
      "SELECT business.*, users.name AS providerName, users.surname AS providerSurname, users.photo AS userPhoto, service.price, service.description FROM business JOIN users ON business.provider = users.id_user JOIN service ON business.id_business = service.id_business ORDER BY business.create_date DESC LIMIT 5"
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
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const category = req.query.category;

  console.log("searchTerm:", searchTerm);
  console.log("rating:", rating);
  console.log("minPrice:", minPrice);
  console.log("maxPrice:", maxPrice);

  console.log("Query parameters:", req.query);

  let query = ` SELECT business.*, users.name AS providerName, users.surname AS providerSurname, 
  users.photo AS userPhoto, service.price, service.description, category.title AS categoryTitle
  FROM business 
  JOIN users ON business.provider = users.id_user 
  JOIN service ON business.id_business = service.id_business 
  JOIN business_cat ON business.id_business = business_cat.business 
  JOIN category ON business_cat.category = category.id_category
  WHERE 1=1`;
  let queryParams = [];

  if (searchTerm.trim() !== "") {
    query += ` AND business.title LIKE ?`;
    queryParams.push(`%${searchTerm}%`);
  }

  if (category && category.trim() !== "") {
    query += ` AND category.title = ?`;
    queryParams.push(category);
  }

  if (rating) {
    query += ` AND business.rating = ?`;
    queryParams.push(rating);
  }

  if (minPrice) {
    query += ` AND service.price >= ?`;
    queryParams.push(minPrice);
  }

  if (maxPrice) {
    query += ` AND service.price <= ?`;
    queryParams.push(maxPrice);
  }
  console.log("Executing query:", query);
  console.log("Query parameters:", queryParams);
  pool
    .execute(query, queryParams)
    .then(([results, fields]) => {
      res.json(results);
    })
    .catch((error) => {
      console.log(error);
      console.log("Error querying the database", error);
      res.status(500).send("Error querying the database");
    });
};

module.exports = { testDbConnection, getNovedades, getResults, getBestRated };
