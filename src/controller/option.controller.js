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

const deleteBusinessOptions = async (req, res) => {
	try {
		let params = [];
		let sql;

		if (req.query.business) {
			params = [req.query.business];
			sql = "DELETE FROM business_options WHERE business = ?";
		} else if (req.query.id_business_options) {
			params = [req.query.id_business_options];
			sql = "DELETE FROM business_options WHERE id_business_options = ?";
		}
		let [result] = await pool.query(sql, params);
		let answer = { error: false, code: 200, message: "opciones eliminadas del negocio", data: result };
		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.log(err);
	}
};

module.exports = { postBusinessOption, getBusinessOptions, deleteBusinessOptions };
