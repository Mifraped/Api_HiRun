const { pool } = require("../database");

const postBusinessCat = async (req, res) => {
	console.log(req.body);
	try {
		let params = [req.body.business, req.body.category];
		let sql = `INSERT INTO business_cat (business, category) VALUES (?, ?)`;
		let [result] = await pool.query(sql, params);
		let answer = { error: false, code: 200, message: "Categoría añadida al negocio", data: [result] };
		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
	}
};

//obtener categorías dado un id_business
const getBusinessCat = async (req, res) => {
	try {
		let params = [req.query.business];
		let sql = `SELECT * FROM business_cat WHERE business = ?`;
		let [result] = await pool.query(sql, params);
		let answer = { error: false, code: 200, message: "datos recibidos", data: result };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.log(err);
	}
};

//eliminar categorías

const deleteBusinessCat = async (req, res) => {
	try {
		let params = [];
		let sql;

		if (req.query.business) {
			params = [req.query.business];
			sql = "DELETE FROM business_cat WHERE business = ?";
		} else if (req.query.id_business_cat) {
			params = [req.query.id_business_cat];
			sql = "DELETE FROM business_cat WHERE id_business_cat = ?";
		}
		let [result] = await pool.query(sql, params);
		let answer = { error: false, code: 200, message: "categorías eliminadas del negocio", data: result };
		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.log(err);
	}
};

module.exports = { postBusinessCat, getBusinessCat, deleteBusinessCat };
