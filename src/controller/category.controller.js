const { pool } = require("../database");

const postUserPref = async (req, res) => {
	try {
		let params = [req.body.user, req.body.category];
		let sql = `INSERT INTO user_pref (user, category) VALUES (?, ?)`;
		let [result] = await pool.query(sql, params);
		let user = console.log(result);

		let answer = { error: false, code: 200, message: "Registro completado" };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };

		res.send(answer);
		console.log(err);
	}
};

const getCategory = async (req, res) => {
	try {
		let sql;
		if (req.query.id == null) {
			sql = `SELECT * FROM category`;
		} else {
			sql = `SELECT * FROM category WHERE id_category=${req.query.id}`;
		}
		let [result] = await pool.query(sql);
		let answer = { error: false, code: 200, message: "OK", data: result };

		res.send(answer);
	} catch (err) {
		console.log(err);
	}
};

module.exports = { postUserPref, getCategory };
