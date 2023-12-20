const { pool } = require("../database");
//a medias
const postService = async (req, res) => {
	try {
		let params = [req.body.title, req.body.description, req.body.duration, req.body.price, req.body.id_business];
		let sql = `INSERT INTO service (title, description, duration, price, id_business ) VALUES (?, ?, ?,?,?)`;
		let [result] = await pool.query(sql, params);
		console.log(result);

		let answer = { error: false, code: 200, message: "Servicio añadido", data: result };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };

		res.send(answer);
		console.log(err);
	}
};

module.exports = { postService };
