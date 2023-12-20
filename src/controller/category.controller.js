const { connection } = require("../database");

const postUserPref = async (req, res) => {
	try {
		let params = [req.body.user, req.body.category];
		let sql = `INSERT INTO user_pref (user, category) VALUES (?, ?)`;
		let [result] = await connection.query(sql, params);
		let user = console.log(result);

		let answer = { error: false, code: 200, message: "Registro completado" };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };

		res.send(answer);
		console.log(err);
	}
};

module.exports = { getStart, postUser };
