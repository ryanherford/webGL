const vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;
in vec4 a_color;

// A matrix to transform the positions by
uniform mat4 u_matrix;

// a varying to pass the color to the fragment shader
out vec4 v_color;

// all shaders have a main function
void main() {
  // Multiply the position by the matrix.
  gl_Position = u_matrix * a_position;

  // Pass the color to the fragment shader.
  v_color = a_color;
}
`;
 
var fragmentShaderSource = `#version 300 es
// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default. It means "medium precision"
precision mediump float;

// the varied color passed from the vertex shader
in vec4 v_color;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  outColor = v_color;
}
`;

const radToDeg = (rad) => {
  return rad * 180 / Math.PI;
}
const degToRad = (deg) => {
  return deg * Math.PI / 180;
}
const createShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    // else
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

const createProgram = (gl, shaders) => {
    const program = gl.createProgram();
    shaders.forEach(s => {
      gl.attachShader(program, s);
    })
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
   
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }
const createRect = (height, width, depth) => {
  const x = 0;
  const y = 0;
  const z = 0;

  return [
    //front face
    x, y, z,
    x, y + height, z,
    x + width, y + height, z,

    x, y, z,
    x + width, y + height, z,
    x + width, y, z,
    
    // back face
    x, y, z + depth,
    x + width, y, z + depth,
    x + width, y + height, z + depth,
    
    x, y, z + depth,
    x + width, y + height, z + depth,
    x, y + height, z + depth,

    // bottom face
    x, y, z,
    x + width, y, z,
    x + width, y , z + depth,
    
    x, y, z,
    x + width, y , z + depth,
    x, y, z + depth,

    // top face
    x, y + height, z,
    x + width, y + height , z + depth,
    x + width, y + height, z,
    
    x, y + height, z,
    x, y + height, z + depth,
    x + width, y + height , z + depth,

    // left face
    x, y, z,
    x, y + height, z + depth,
    x, y + height, z,

    x, y, z,
    x, y, z + depth,
    x, y + height, z + depth,

    // right face
    x + width, y, z,
    x + width, y + height, z,
    x + width, y + height, z + depth,

    x + width, y, z,
    x + width, y + height, z + depth,
    x + width, y, z + depth,
  ];
}
export {
    vertexShaderSource,
    fragmentShaderSource,
    createShader,
    createProgram,
    radToDeg,
    degToRad,
    createRect,
}