class User {
	constructor(id_user, email, password, name, surname, location, phoneNumber, photo) {
		this.id_user = id_user;
		this.email = email;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.location = location;
		this.phoneNumber = phoneNumber;
		this.photo = photo;
	}
}

module.exports = User;
