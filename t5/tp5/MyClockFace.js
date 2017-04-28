/**
 * MyClockFace
 * @param gl {WebGLRenderingContext, numberOfSlices}
 * @constructor
 */
function MyClockFace(scene, slices) {
	CGFobject.call(this, scene);

	this.slices = slices;

	this.initBuffers();
};

MyClockFace.prototype = Object.create(CGFobject.prototype);
MyClockFace.prototype.constructor = MyClockFace;

MyClockFace.prototype.initBuffers = function () {

	var ang = 2 * (Math.PI / this.slices);

	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];

	this.vertices.push(0, 0, 0);
	for (var i = 0; i < this.slices; i++) {
		this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), 0);
		this.indices.push(0, i, i + 1);
		this.normals.push(0, 0, 1);
	}
	this.indices.push(0, this.slices, 1);

	this.texCoords.push(0.5, 0.5);
	for (var i = 0; i < this.slices; i++) {
		this.normals.push(0, 0, 1);
		this.texCoords.push(0.5 + 0.5 * Math.cos(-i * ang), 0.5 + 0.5 * Math.sin(-i * ang));
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};