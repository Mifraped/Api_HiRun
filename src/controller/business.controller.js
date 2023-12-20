const { connection } = require("../database");
//a medias
const postBusiness = async (req, res) => {
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
