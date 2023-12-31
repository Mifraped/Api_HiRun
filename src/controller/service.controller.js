const { pool } = require("../database");
//a medias
const postService = async (req, res) => {
	try {
		let params = [req.body.title, req.body.description, req.body.duration, req.body.price, req.body.id_business];
		let sql = `INSERT INTO service (title, description, duration, price, id_business ) VALUES (?, ?, ?,?,?)`;
		let [result] = await pool.query(sql, params);
		console.log(result);

		let answer = { error: false, code: 200, message: "Servicio añadido", data: [result] };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.log(err);
	}
};

const getService = async (req, res) => {
	try {
		let sql;
		let params;

		if (req.query.id_user) {
			params = [req.query.id_user];
			sql = "SELECT ser.title, ser. price, bus.photo AS businessPhoto, book.date, book.canceled, us.photo AS userPhoto FROM hirun.users AS us INNER JOIN hirun.business AS bus ON (us.id_user = bus.provider) INNER JOIN hirun.service AS ser ON (bus.id_business = ser.id_business) INNER JOIN hirun.booking AS book ON (ser.id_service = book.service) WHERE book.user = ? ORDER BY date DESC";
		} else if (req.query.id_business) {
			params = [req.query.id_business];
			sql = "SELECT * FROM service WHERE id_business = ?";
		} else if (req.query.id_service) {
			//un único servicio por su id
			params = [req.query.id_service];
			sql = "SELECT * FROM service WHERE id_service = ?";
		} else {
			//todos
			params = [];
			sql = "SELECT * FROM service";
		}
		let [result] = await pool.query(sql, params);
		let respuesta = { error: false, code: 200, message: "Enviando servicios solicitados", data: result };
		res.send(respuesta);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.log(err);
	}
};

const putService = async (req, res) => {
	try {
		let params = [req.body.title, req.body.description, req.body.duration, req.body.price, req.body.id_business, req.body.id_service];
		let sql = "UPDATE service SET title = COALESCE(?, title),description = COALESCE(?, description),duration = COALESCE(?, duration), price = COALESCE(?, price), id_business = COALESCE(?, id_business) WHERE id_service = ?";
		let [result] = await pool.query(sql, params);
		let answer = { error: false, code: 200, message: "Servicio editado", data: result };
		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.log(err);
	}
};

const deleteService = async (req, res) => {
	try {
		let params = [];
		let sql;

		if (req.query.id_service) {
			params = [req.query.id_service];
			sql = "DELETE FROM service WHERE id_service = ?";
		} else if (req.query.id_business) {
			params = [req.query.id_business];
			sql = "DELETE FROM service WHERE id_business = ?";
		}
		let [result] = await pool.query(sql, params);
		let answer = { error: false, code: 200, message: "Servicio eliminado", data: result };
		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.log(err);
	}
};

module.exports = { postService, getService, putService, deleteService };
