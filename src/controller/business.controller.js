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

const getBusiness = async (req, res) => {
	try{
		let params = [req.query.id_user]
		let sql = "SELECT title, bus.photo, rating FROM hirun.users AS us INNER JOIN hirun.business AS bus ON (us.id_user = bus.provider) WHERE us.id_user = ?"
		let [result] = await pool.query(sql, params)
		let respuesta = { error: false, code: 200, message: "Enviando datos", data: result }
		res.send(respuesta)
	}catch(error){
		console.log(error);
	}
}

module.exports = { postBusiness, getBusiness };
