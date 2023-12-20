class Category {
	constructor(id_category, title) {
		this.id_category = id_category;
		this.title = title;
	}
}

class UserPref {
	constructor(id_user_pref, user, category) {
		this.id_user_pref = id_user_pref;
		this.user = user;
		this.category = category;
	}
}

module.exports = { Category, UserPref };
