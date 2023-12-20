const { pool } = require("../database");
//a medias
const postBusiness = async (req, res) => {
	console.log(req.body);
	try {
		let params = [req.body.provider, req.body.title, req.body.photo];
		let sql = `INSERT INTO business (provider, title, photo) VALUES (?, ?, ?)`;
		let [result] = await pool.query(sql, params);
		console.log(result);

		let answer = { error: false, code: 200, message: "Negocio añadido", data: [result] };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };

		res.send(answer);
		console.log(err);
	}
};

module.exports = { postBusiness };
