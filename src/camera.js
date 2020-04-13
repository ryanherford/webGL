import { degToRad } from './webGLUtils.js';

class Camera {
	constructor(cameraAngleDeg, fieldOfViewRad, x, y, z) {
		this.cameraAngleDeg = cameraAngleDeg;
		this.fieldOfViewRad = fieldOfViewRad;
		this.x = x;
		this.y = y;
		this.z = z;
	}

	getCameraAngleRad() {
		return degToRad(this.cameraAngleDeg);
	}
	update(state) {
		this.x += state.x || 0;
		this.y += state.y || 0;
		this.z += state.z || 0;
		this.cameraAngleDeg += state.angle || 0;
	}
	
	controller (keysPressed) {
		const keyMap = {
			"ArrowDown": {z: 10},
			"ArrowUp": {z: -10},
			"ArrowRight": {x: 10},
			"ArrowLeft": {x: -10},
			"a": {angle: 10},
			"d": {angle: -10},
			"Shift": {y: 10},
			"Control": {y: -10},
		}
		let state = {};
		Object.keys(keysPressed).forEach(key => {
			state = { ...state, ...keyMap[key]}
		});
		this.update(state);
	}
}

export default Camera;