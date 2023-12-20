class Service {
	constructor(id_service, title, description, duration, price, id_business) {
		this.id_service = id_service;
		this.title = title;
		this.description = description;
		this.duration = duration;
		this.price = price;
		this.id_business = id_business;
	}
}

module.exports = Service;
