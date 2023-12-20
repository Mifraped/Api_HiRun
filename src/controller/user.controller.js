const { connection } = require("../database");

const getStart = (req, res) => {
	let respuesta = { error: false, codigo: 400, message: "Funciona!" };
	res.send(respuesta);
};

const loginUser = async (req, res) => {
	try {
		let params = [req.body.email, req.body.password];
		let sql = "SELECT id_user, email, name, surname, location, phonenumber, photo, company FROM hirun.user WHERE email = ? AND password = ?";
		let [result] = await pool.query(sql, params);
		let resultado = result[0];
		let respuesta;
		if (result.length > 0) {
			respuesta = { error: false, codigo: 200, message: "Datos correctos", data: resultado };
		} else {
			respuesta = { error: true, codigo: 200, message: "Datos incorrectos" };
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
		let [result] = await connection.query(sql, params);
		let user = console.log(result);

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

module.exports = { getStart, loginUser, postUser };
