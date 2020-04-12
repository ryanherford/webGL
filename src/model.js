class Model {
	constructor(position, tex, gl, attribs, bufferSize, pos){
		this.positionData = position;
		this.textureData = tex;
		this.bufferSize = bufferSize;
		this.size = position.length / bufferSize;
		this.pos = pos;
		this.createVaoAndSetAttributes(gl, attribs);
	}

	createVaoAndSetAttributes(gl, attribs) {
	// create a position buffer
    const positionBuffer = gl.createBuffer();
    // bind it to the array_buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // create a vertex array object
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(attribs.position);
    gl.bindVertexArray(vao);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positionData), gl.STATIC_DRAW);
    gl.vertexAttribPointer(attribs.position, 3, gl.FLOAT, false, 0, 0);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,new Uint8Array(this.textureData), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(attribs.color);
		gl.vertexAttribPointer(attribs.color, 3, gl.UNSIGNED_BYTE, true, 0, 0);
		this.vao = vao;
	}
}

export default Model;