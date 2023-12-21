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
	let params = [req.query.id_user]
	let sql = "SELECT ser.title, ser. price, bus.photo AS businessPhoto, book.date, book.canceled, usr.photo AS userPhoto FROM hirun.users AS us INNER JOIN hirun.business AS bus ON (us.id_user = bus.provider) INNER JOIN hirun.service AS ser ON (bus.id_business = ser.id_business) INNER JOIN hirun.booking AS book ON (ser.id_service = book.service) INNER JOIN hirun.users AS usr ON (book.user = usr.id_user) WHERE book.user = ?"
	let [result] = await pool.query(sql, params)
	let respuesta = { error: false, code: 200, message: "Enviando servicios solicitados", data: result }
	res.send(respuesta)
}

module.exports = { postService, getService };
