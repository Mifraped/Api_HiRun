class Rating {
	constructor(id_rating, id_user, id_service, rate, comment) {
		this.id_rating = id_rating;
		this.id_user = id_user;
		this.id_service = id_service;
		this.rate = rate;
		this.comment = comment;
	}
}

module.exports = Rating;
