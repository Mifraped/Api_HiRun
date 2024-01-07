const { pool } = require("../database");

const postRating = async (req, res) => {
	try {
		let params = [req.body.id_user, req.body.id_service, req.body.rate, req.body.comment];
		let sql = `INSERT INTO rate (id_user, id_service, rate,  comment) VALUES (?, ?, ?, ? )`;
		let [result] = await pool.query(sql, params);
		console.log(result);

		let answer = { error: false, code: 200, message: "Reseña recibida", data: result };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };

		res.send(answer);
		console.log(err);
	}
};

const putRating = async (req, res) => {
	try {
		let params = [req.body.rate, req.body.comment, req.body.id_rate];
		let sql = `UPDATE rate SET rate = COALESCE(?, rate), comment = COALESCE(?, comment) WHERE id_rate = ?`;
		let [result] = await pool.query(sql, params);
		console.log(result);

		let answer = { error: false, code: 200, message: "Reseña modificada", data: result };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };

		res.send(answer);
		console.log(err);
	}
};

const getRating = async (req, res) => {
	try {
		let sql;
		let params = [];
		//para ver si un usuario ha valorado un servicio
		if (req.query.id_user && req.query.id_service) {
			params = [req.query.id_user, req.query.id_service];
			sql = "SELECT * from rate WHERE id_user = ? AND id_service = ?";
			//else: si se indica solo id_user del provider, obtener todos los rating donde ese user sea provider
		} else if (req.query.id_provider) {
			params = [req.query.id_provider];
			sql = "SELECT id_rate, id_user , rate, comment FROM rate AS r JOIN service AS s ON r.id_service = s.id_service JOIN business AS b ON  s.id_business = b.id_business WHERE b.provider = ?";
		}

		let [result] = await pool.query(sql, params);
		console.log(result);

		let answer = { error: false, code: 200, message: "Datos de reseña", data: result };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };

		res.send(answer);
		console.log(err);
	}
};

module.exports = { postRating, putRating, getRating };
