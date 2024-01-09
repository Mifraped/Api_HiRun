const { pool } = require("../database");
//a medias
const postBooking = async (req, res) => {
	try {
		let params = [req.body.date, req.body.time, req.body.service, req.body.user, req.body.comment];
		let sql = `INSERT INTO booking (date, time, service, user, comment) VALUES (?, ?, ?, ?, ?)`;
		let [result] = await pool.query(sql, params);
		console.log(result);

		let answer = { error: false, code: 200, message: "Reserva creada", data: [result] };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };

		res.send(answer);
		console.log(err);
	}
};

const getBooking = async (req, res) => {
	try {
		let sql;
		let params;

		//si se indica user id trae todas las reservas de un usuario(para el calendario)
		if (req.query.user) {
			params = [req.query.user, req.query.user];
			sql = "SELECT booking.id_booking, booking.date, booking.time, booking.service, booking.user, booking.comment, booking.canceled FROM booking LEFT JOIN service ON booking.service = service.id_service  LEFT JOIN business ON service.id_business = business.id_business  WHERE booking.user = ? OR  (service.id_service IS NOT NULL AND business.provider = ?)";
		}

		let [result] = await pool.query(sql, params);
		let respuesta = { error: false, code: 200, message: "Enviando datos", data: result };
		res.send(respuesta);
	} catch (error) {
		console.log(error);
	}
};

const putBooking = async (req, res) => {
	try {
		let params = [req.body.id_booking];
		let sql = "UPDATE booking SET canceled = 1 WHERE id_booking = ?";
		let [result] = await pool.query(sql, params);
		let answer = { error: false, code: 200, message: "Reserva cancelada", data: result };
		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.log(err);
	}
};

const deleteBooking = async (req, res) => {
	try {
		let params = [req.query.id_booking];
		let sql = "DELETE FROM booking WHERE id_booking = ?";
		let [result] = await pool.query(sql, params);
		let answer = { error: false, code: 200, message: "Reserva eliminada", data: result };
		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.log(err);
	}
};

module.exports = { postBooking, getBooking, deleteBooking, putBooking };
