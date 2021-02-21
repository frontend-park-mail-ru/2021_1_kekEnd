

class ProfileView {
	this.main = ""

	construtor(eventBus) {
		this.eventBus = eventBus
	}

	render() {
		
	}

	hideUserInfo() {
		document.getElementsByClassName('profile-card')[0].innerHTML = ""
	} 
}
