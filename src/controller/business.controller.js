const { pool } = require("../database");
//a medias
const postBusiness = async (req, res) => {
	try {
		let params = [req.body.provider, req.body.title, req.body.photo, req.body.create_date, req.body.address];
		let sql = `INSERT INTO business (provider, title, photo, create_date, address) VALUES (?, ?, ?, ?, ?)`;
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
			sql = "SELECT title, bus.photo, rating, bus.id_business, bus.provider FROM hirun.users AS us INNER JOIN hirun.business AS bus ON (us.id_user = bus.provider) WHERE us.id_user = ? ORDER BY bus.id_business DESC";
			//si se indica el id del negocio trae de vuelta solo ese
		} else if (req.query.id_business) {
			params = [req.query.id_business];
			sql = "SELECT * FROM business WHERE id_business = ?";
		} else if (req.query.minRate) {
			params = [req.query.minRate];
			sql = "SELECT business.*, users.name AS providerName, users.surname AS providerSurname, users.photo AS userPhoto, service.price, service.description FROM business JOIN users ON business.provider = users.id_user JOIN service ON business.id_business = service.id_business WHERE business.rating >= ?";
		} else {
			//todos
			params = [];
			sql = "SELECT business.*, users.name AS providerName, users.surname AS providerSurname, users.photo AS userPhoto, service.price, service.description FROM business JOIN users ON business.provider = users.id_user JOIN service ON business.id_business = service.id_business ORDER BY business.create_date DESC limit 50";
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
		let params = [req.body.title, req.body.photo, req.body.address, req.body.id_business];
		let sql = "UPDATE business SET title = COALESCE(?, title), photo = COALESCE(?, photo), address = COALESCE(?, address) WHERE id_business = ?";
		let [result] = await pool.query(sql, params);
		let answer = { error: false, code: 200, message: "Negocio editado", data: result };
		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.log(err);
	}
};

const getRecommendedBusiness = async (req, res) => {
	try {
		let params = [req.query.id_user];
		let sql = "SELECT main.*, sub.avg_rate FROM (SELECT DISTINCT b.id_business, b.provider, b.title, b.photo, b.create_date, b.address, u.name AS providerName, u.surname AS providerSurname, u.photo AS userPhoto, s.price, s.description, s.id_service FROM user_pref INNER JOIN business_cat ON (user_pref.category = business_cat.category) INNER JOIN service AS s ON (business_cat.business = s.id_business) INNER JOIN business AS b ON (s.id_business = b.id_business) INNER JOIN users AS u ON (b.provider = u.id_user) WHERE user = ?) AS main INNER JOIN (SELECT id_service, AVG(rate) AS avg_rate FROM hirun.rate GROUP BY id_service) AS sub ON main.id_service = sub.id_service WHERE sub.avg_rate > 2.5 ORDER BY main.id_business DESC;";
		let [result] = await pool.query(sql, params);
		let respuesta = { error: false, code: 200, message: "Enviando datos", data: result };
		res.send(respuesta);
	} catch (error) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.log(error);
	}
}

module.exports = { postBusiness, getBusiness, deleteBusiness, putBusiness, getRecommendedBusiness };
