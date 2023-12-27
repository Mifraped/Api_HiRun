const { pool } = require("../database");
//a medias
const postBusiness = async (req, res) => {
	console.log(req.body);
	try {
		let params = [req.body.provider, req.body.title, req.body.photo, req.body.create_date];
		let sql = `INSERT INTO business (provider, title, photo, create_date) VALUES (?, ?, ?, ?)`;
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
	try {
		let sql;
		let params;

		//si se indica user id trae todos los negocios activos de un usuario(business-provided)
		if (req.query.id_user) {
			params = [req.query.id_user];
			sql = "SELECT title, bus.photo, rating, bus.id_business FROM hirun.users AS us INNER JOIN hirun.business AS bus ON (us.id_user = bus.provider) WHERE us.id_user = ?";
			//si se indica el id del negocio trae de vuelta solo ese
		} else if (req.query.id_business) {
			params = [req.query.id_business];
			sql = "SELECT * FROM business WHERE id_business = ?";
		} else {
			//todos
			params = [];
			sql = "SELECT * FROM hirun.business";
		}
		let [result] = await pool.query(sql, params);
		let respuesta = { error: false, code: 200, message: "Enviando datos", data: result };
		res.send(respuesta);
	} catch (error) {
		console.log(error);
	}
};

const deleteBusiness = async (req, res) => {
	try {
		let params = [req.query.id_business];
		let sql = "DELETE FROM business WHERE id_business = ?";
		let [result] = await pool.query(sql, params);
		let answer = { error: false, code: 200, message: "Negocio eliminado", data: result };
		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.log(err);
	}
};

const putBusiness = async (req, res) => {
	try {
		let params = [req.body.title, req.body.photo, req.body.id_business];
		let sql = "UPDATE business SET title = COALESCE(?, title), photo = COALESCE(?, photo) WHERE id_business = ?";
		let [result] = await pool.query(sql, params);
		let answer = { error: false, code: 200, message: "Negocio editado", data: result };
		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.log(err);
	}
};

module.exports = { postBusiness, getBusiness, deleteBusiness, putBusiness };
