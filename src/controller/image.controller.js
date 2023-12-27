const { pool } = require("../database");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./src/uploads/"); // Directorio donde se almacenarán las imágenes
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });

const postImage = async (req, res) => {
	try {
		upload.single("photo")(req, res, async (err) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: "Error uploading file.", error: err });
			}

			const photoPath = req.file.filename;
			console.log("File uploaded:", photoPath);

			let sql;
			let params;

			if (req.body.id_business) {
				console.log("Hola");
				params = [photoPath, req.body.id_business];
				console.log(params);
				sql = "UPDATE business SET  photo = ? WHERE id_business = ?";
			} else if (req.body.id_user) {
				params = [photoPath, req.body.id_user];
				sql = "UPDATE user SET  photo = ? WHERE id_user = ?";
			}

			let [result] = await pool.query(sql, params);
			let answer = { error: false, code: 200, message: "Imagen subida", data: result };
			res.send(answer);
		});
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		res.send(answer);
		console.error(err);
	}
};

module.exports = { postImage };
