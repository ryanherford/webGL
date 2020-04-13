class KeyboardHandler {
	constructor(object) {
		this.object = object;
		this.registerControls();
		this.state = {};
	}
	registerControls () {
		window.addEventListener("keydown", (event) => {
			if (event.defaultPrevented) {
				return;
			}
			this.state[event.key] = true;;
			this.object.controller(this.state, 'keydown');
			
			event.preventDefault();
		}, true);

		window.addEventListener("keyup", (event) => {
			if (event.defaultPrevented) {
				return;
			}
			delete this.state[event.key];
			this.object.controller(this.state, 'keyup');
			event.preventDefault();
		}, true);
	}
	clearControls () {
		window.removeEventListener("keydown");
		window.removeEventListener("keyup");
	}
}

export default KeyboardHandler;