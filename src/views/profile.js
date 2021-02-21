

class ProfileView {
	construtor(eventBus) {
		this.eventBus = eventBus
	}

	render() {
		this.setEventListeners()
	}

	setEventListeners() {
		const button = document.getElementById('my_button')
        button.addEventListener('click', (event) => {
			alert("Update")
        });
	}

	hideUserInfo() {
		document.getElementsByClassName('profile-card')[0].innerHTML = ""
	} 
}
