const express = require("express");
const cors = require("cors");
const errorHandling = require("./error/errorHandling");

const filterRoutes = require("./routers/filter.routes");

const userRouter = require("./routers/user.routers");
const businessRouter = require("./routers/business.routers");
const serviceRouter = require("./routers/service.routers");
const categoryRouter = require("./routers/category.routers");
const businessCatRouter = require("./routers/business_cat.routers");
const timeframeRouter = require("./routers/timeframe.routers");
const optionRouter = require("./routers/option.routers");
const imageRouter = require("./routers/image.routers");

const app = express();

const path = require("path");

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/get-image/:imageName", (req, res) => {
	try {
		const imageName = req.params.imageName;
		const imagePath = path.join(__dirname, "uploads", imageName);

		// Envía la imagen como respuesta
		res.sendFile(imagePath);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error interno del servidor");
	}
});

app.use(errorHandling);

app.use(filterRoutes);

app.use(userRouter);
app.use(businessRouter);
app.use(serviceRouter);
app.use(categoryRouter);
app.use(businessCatRouter);
app.use(timeframeRouter);
app.use(optionRouter);
app.use(imageRouter);

app.use(function (req, res, next) {
	res.status(404).json({
		error: true,
		codigo: 404,
		message: "Endpoint doesnt found",
	});
});

module.exports = app;
