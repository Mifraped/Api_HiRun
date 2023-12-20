class Timeframe {
	constructor(id_timeframe, start, end, days, id_business) {
		this.id_timeframe = id_timeframe;
		this.start = start;
		this.end = end;
		this.days = days;
		this.id_business = id_business;
	}
}

module.exports = Timeframe;
