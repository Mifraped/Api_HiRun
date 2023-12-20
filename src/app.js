const express = require("express");
const cors = require("cors");
const errorHandling = require("./error/errorHandling");
const routes = require("./routes/user.routes");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(errorHandling);
app.use(routes);

app.use(function (req, res, next) {
	res.status(404).json({
		error: true,
		codigo: 404,
		message: "Endpoint not found",
	});
});

module.exports = app;
