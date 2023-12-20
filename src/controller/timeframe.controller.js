const { pool } = require("../database");

const postTimeframe = async (req, res) => {
	console.log(req.body);
	try {
		let params = [req.body.start, req.body.end, req.body.days, req.body.id_business];
		let sql = `INSERT INTO timeframe (start, end, days, id_business) VALUES (?, ?, ?, ?)`;
		let [result] = await pool.query(sql, params);
		console.log(result);

		let answer = { error: false, code: 200, message: "Franja horaria añadida al negocio", data: [result] };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };

		res.send(answer);
		console.log(err);
	}
};

module.exports = { postTimeframe };
