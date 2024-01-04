const { pool } = require("../database");

const postTimeframe = async (req, res) => {
	try {
		let params = [req.body.start, req.body.end, req.body.days, req.body.id_business];
		let sql = `INSERT INTO timeframe (start, end, days, id_business) VALUES (?, ?, ?, ?)`;
		let [result] = await pool.query(sql, params);

		let answer = { error: false, code: 200, message: "Franja horaria añadida al negocio", data: result };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };

		res.send(answer);
		console.log(err);
	}
};

const deleteTimeframe = async (req, res) => {
	try {
		let params = [];
		let sql;
		if (req.query.id_timeframe) {
			params = [req.query.id_timeframe];
			sql = `DELETE FROM timeframe WHERE id_timeframe = ?`;
		} else if (req.query.id_business) {
			params = [req.query.id_business];
			sql = `DELETE FROM timeframe WHERE id_business = ?`;
		}
		let [result] = await pool.query(sql, params);
		console.log(result);

		let answer = { error: false, code: 200, message: "Franja horaria eliminada", data: result };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };

		res.send(answer);
		console.log(err);
	}
};

const getTimeframe = async (req, res) => {
	try {
		let params = [];
		let sql;

		if (req.query.id_business) {
			params = [req.query.id_business];
			sql = `SELECT * FROM timeframe WHERE id_business=?`;
		} else if (req.query.id_user) {
			params = [req.query.id_user];
			sql = `SELECT timeframe.id_timeframe, timeframe.start, timeframe.end, timeframe.days, timeframe.id_business FROM timeframe JOIN business ON timeframe.id_business = business.id_business WHERE business.provider = ?`;
		}
		let [result] = await pool.query(sql, params);
		let answer = { error: false, code: 200, message: "datos recibidos", data: result };
		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.log(err);
	}
};

module.exports = { postTimeframe, deleteTimeframe, getTimeframe };
