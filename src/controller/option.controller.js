const { pool } = require("../database");

const postBusinessOption = async (req, res) => {
	try {
		let params = [req.body.business, req.body.id_options];
		let sql = `INSERT INTO business_options (business, id_options ) VALUES (?, ?)`;
		let [result] = await pool.query(sql, params);
		console.log(result);

		let answer = { error: false, code: 200, message: "Opción añadida a negocio", data: [result] };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };

		res.send(answer);
		console.log(err);
	}
};

const getBusinessOptions = async (req, res) => {
	try {
		let params = [req.query.business];
		let sql = `SELECT * FROM business_options WHERE business = ?`;
		let [result] = await pool.query(sql, params);
		let answer = { error: false, code: 200, message: "datos recibidos", data: result };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.log(err);
	}
};

module.exports = { postBusinessOption, getBusinessOptions };
