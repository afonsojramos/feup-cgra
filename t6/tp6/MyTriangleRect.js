/**
 * MyTriangleRect
 * @constructor
 */
function MyTriangleRect(scene) {
	CGFobject.call(this, scene);

	this.initBuffers();
};

MyTriangleRect.prototype = Object.create(CGFobject.prototype);
MyTriangleRect.prototype.constructor = MyTriangleRect;

MyTriangleRect.prototype.initBuffers = function () {
	this.vertices = [
		1, 0, 0,
		0, 0, 0,
		0, 0, 1,
	];

	this.indices = [
		0, 1, 2,
		2, 1, 0
	];

	this.normals = [
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
	]

	this.texCoords = [
		0, 1,
		1, 1,
		1, 0
	];

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
