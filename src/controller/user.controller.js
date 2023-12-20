const { pool } = require("../database");

const getStart = (req, res) => {
	let respuesta = { error: false, code: 400, message: "Funciona!" };
	res.send(respuesta);
};

const loginUser = async (req, res) => {
	try {
		let params = [req.body.email, req.body.password];
		let sql = "SELECT id_user, email, name, surname, location, phonenumber, photo, company FROM hirun.users WHERE email = ? AND password = ?";
		let [result] = await pool.query(sql, params);
		let resultado = result[0];
		let respuesta;
		if (result.length > 0) {
			respuesta = { error: false, code: 200, message: "Datos correctos", data: resultado };
		} else {
			respuesta = { error: true, code: 200, message: "Datos incorrectos" };
		}
		res.send(respuesta);
	} catch (error) {
		console.log(error);
	}
};

const postUser = async (req, res) => {
	try {
		let params = [req.body.email, req.body.password, req.body.name, req.body.surname, req.body.location, req.body.phoneNumber, req.body.photo];
		let sql = `INSERT INTO users (email, password, name, surname, location, phoneNumber, photo) VALUES (?, ?, ?, ?, ?, ?, ?)`;
		let [result] = await pool.query(sql, params);
		// let user =
		console.log(result);

		let answer = { error: false, code: 200, message: "Registro completado" };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		if (err.code == "ER_DUP_ENTRY") {
			answer = { error: true, code: 1, message: "Ya existe un usuario con ese email" };
		}

		res.send(answer);
		console.log(err);
	}
};

const getRates = async (req, res) => {
	try{
		let params = [req.query.id_user]
		let sql = "SELECT r.rate, r.comment, ru.name, ru.photo FROM hirun.users AS u INNER JOIN hirun.business AS b ON (u.id_user = b.provider) INNER JOIN hirun.service AS s ON (b.id_business = s.id_business) INNER JOIN hirun.rate AS r ON (s.id_service = r.id_service) INNER JOIN hirun.users AS ru ON (r.id_user = ru.id_user) WHERE u.id_user = ?"
		let [result] = await pool.query(sql, params)
		let respuesta = { error: false, code: 200, message: "Enviando datos", data: result }
		console.log(result);
		res.send(respuesta)
	}catch(error){
		console.log(error)
	}
}

module.exports = { getStart, loginUser, postUser, getRates };
