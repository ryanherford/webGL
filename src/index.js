import { vertexShaderSource, fragmentShaderSource, createShader, createProgram, radToDeg, degToRad, createRect} from './webGLUtils.js';
import Camera from './camera.js';
import KeyboardHandler from './keyboardHandler.js';
import m4 from './matrixUtils.js';
import Model from './model.js';
import f from './f.json';

let gl;
let program;
let matrixLocation;
const objects = [];
let keyboardHandler;
let camera;
function main() {
    const canvas = document.getElementById('canvas');
    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.log('No Web GL. Won\'t load!');
        return;
    }
    
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    program = createProgram(gl, [vertexShader, fragmentShader]);
    const attribNames = ['position', 'color'];
    const attribs = {};
    attribNames.forEach(name => {
      attribs[`${name}`] = gl.getAttribLocation(program, `a_${name}`);
    });
    objects.push(new Model(createRect(100,100, 100), f.texture, gl, attribs, 3, [0, 0, -200]));
    objects.push(new Model(createRect(100,200, 100), f.texture, gl, attribs, 3, [100, -50, -200]));
    objects.push(new Model(createRect(200,100, 100), f.texture, gl, attribs, 3, [50, -50, -400]));
    objects.push(new Model(createRect(300, 50 , 100), f.texture, gl, attribs, 3, [-200, -200, -400]));
    matrixLocation = gl.getUniformLocation(program, 'u_matrix');
    camera = new Camera(0, degToRad(60), 0, 0, 100);
    keyboardHandler = new KeyboardHandler(camera);

    requestAnimationFrame(drawScene);
}

function drawScene() {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    gl.useProgram(program);

    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 1;
    const zFar = 2000;
    const projectionMatrix = m4.perspective(camera.fieldOfViewRad, aspect, zNear, zFar);
    // Make a view matrix from the camera matrix.
    let cameraMatrix = m4.yRotation(camera.getCameraAngleRad());
    cameraMatrix = m4.translate(cameraMatrix, camera.x, camera.y, camera.z);
    // console.log(camera.x, camera.y, camera.z, camera.getCameraAngleRad())
    // console.log(objects[0].pos[0], objects[0].pos[1], objects[0].pos[2]);
    // Compute the position of the first F
    // const fPosition = [objects[0].pos[0], objects[0].pos[1], objects[0].pos[2]];
    // // Get the camera's postion from the matrix we computed
    // const cameraPosition = [
    //   cameraMatrix[12],
    //   cameraMatrix[13],
    //   cameraMatrix[14],
    // ];
    // const up = [0, 1, 0];
    // cameraMatrix = m4.lookAt(cameraPosition, fPosition, up);
    const viewMatrix = m4.inverse(cameraMatrix);
    // create a viewProjection matrix. This will both apply perspective
    // AND move the world so that the camera is effectively the origin
    const viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
    objects.forEach(obj => {
      render(matrixLocation, viewProjectionMatrix, obj);
    });
    requestAnimationFrame(drawScene);
}

function render(matrixLocation, viewProjectionMatrix, obj) {
  gl.bindVertexArray(obj.vao);
  const matrix = m4.translate(viewProjectionMatrix, obj.pos[0], obj.pos[1], obj.pos[2]);
	gl.uniformMatrix4fv(matrixLocation, false, matrix);
	gl.drawArrays(gl.TRIANGLES,0, obj.size);
}



main();