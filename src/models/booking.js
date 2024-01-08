class Booking {
	constructor(id_booking, date, time, service, user, comment, cancelled) {
		this.id_booking = id_booking;
		this.date = date;
		this.time = time;
		this.service = service;
		this.user = user;
		this.comment = comment;
		// this.cancelled = cancelled;
	}
}

module.exports = Booking;
