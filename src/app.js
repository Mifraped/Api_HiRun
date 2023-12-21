const express = require("express");
const cors = require("cors");
const errorHandling = require("./error/errorHandling");
const userRouter = require("./routers/user.routers");
const businessRouter = require("./routers/business.routers");
const serviceRouter = require("./routers/service.routers");
const categoryRouter = require("./routers/category.routers");
const businessCatRouter = require("./routers/business_cat.routers");
const timeframeRouter = require("./routers/timeframe.routers");
const optionRouter = require("./routers/option.routers");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(errorHandling);
app.use(userRouter);
app.use(businessRouter);
app.use(serviceRouter);
app.use(categoryRouter);
app.use(businessCatRouter);
app.use(timeframeRouter);
app.use(optionRouter);

app.use(function (req, res, next) {
	res.status(404).json({
		error: true,
		codigo: 404,
		message: "Endpoint not found",
	});
});

module.exports = app;
