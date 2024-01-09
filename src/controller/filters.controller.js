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
		.execute("SELECT business.*, users.name AS providerName, users.surname AS providerSurname, users.photo AS userPhoto, service.price, service.description FROM business JOIN users ON business.provider = users.id_user JOIN service ON business.id_business = service.id_business WHERE business.rating >= 4")
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
		.execute("SELECT business.*, users.name AS providerName, users.surname AS providerSurname, users.photo AS userPhoto, service.price, service.description FROM business JOIN users ON business.provider = users.id_user JOIN service ON business.id_business = service.id_business ORDER BY business.create_date DESC LIMIT 50")
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
	const rating = req.query.ratingFilter;
	const minPrice = req.query.minPrice;
	const maxPrice = req.query.maxPrice;
	const category = req.query.category;
	let otherValues = req.query.other;
	let orderBy = req.query.orderBy;

	let query = `
SELECT 
  business.*,
  users.name AS providerName,
  users.surname AS providerSurname,
  users.photo AS userPhoto,
  service.price,
  service.description,
  category.title AS categoryTitle,
  GROUP_CONCAT(options.title) AS Opciones
FROM
  business
  JOIN users ON business.provider = users.id_user
  JOIN service ON business.id_business = service.id_business
  JOIN business_cat ON business.id_business = business_cat.business
  JOIN category ON business_cat.category = category.id_category
  LEFT JOIN business_options ON business.id_business = business_options.business
  LEFT JOIN options ON business_options.id_options = options.id_options
WHERE 1=1`;

	let queryParams = [];

	if (searchTerm.trim() !== "") {
		query += ` AND business.title LIKE ?`;
		queryParams.push(`%${searchTerm}%`);
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

	if (category) {
		query += ` AND category.title = ?`;
		queryParams.push(category);
	}

	if (otherValues) {
		if (typeof otherValues === "string") {
			otherValues = [otherValues]; // If 'other' is a string, convert it to an array
		}

		query += " AND (";
		otherValues.forEach((value, index) => {
			if (index > 0) {
				query += " OR ";
			}
			query += `options.title = ?`; // Add a condition for each option
			queryParams.push(value); // Add the option to the query parameters
		});
		query += ")";
	}

	query += ` GROUP BY business.id_business`;

	if (orderBy) {
		switch (orderBy) {
			case "Mejores Valorados":
				orderBy = "rating";
				break;
			case "Más baratos":
				orderBy = "price";
				break;
			case "Recientes":
				orderBy = "create_date";
				break;
		}
		query += ` ORDER BY ${orderBy}`;
	}

	console.log(req.query);

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

module.exports = {
	testDbConnection,
	getNovedades,
	getResults,
	getBestRated,
};
