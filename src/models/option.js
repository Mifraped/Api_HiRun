class Option {
	constructor(id_option, title) {
		this.id_option = id_option;
		this.title = title;
	}
}

class BusinessOpt {
	constructor(id_business_option, business, id_option) {
		this.id_business_option = id_business_option;
		this.business = business;
		this.id_option = id_option;
	}
}

module.exports = { Option, BusinessOpt };
