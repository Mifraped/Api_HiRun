const { pool } = require("../database");

const getChat = async (req, res) => {
	try {
		let sql;
		let params;

		//si se indica user id trae todos los chats donde hay un usuario
		if (req.query.id_user) {
			params = [req.query.id_user, req.query.id_user];
			sql = "SELECT * FROM chat WHERE user1 = ? OR user2 = ?";
		}

		let [result] = await pool.query(sql, params);
		let respuesta = { error: false, code: 200, message: "Enviando datos", data: result };
		res.send(respuesta);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { getChat };
