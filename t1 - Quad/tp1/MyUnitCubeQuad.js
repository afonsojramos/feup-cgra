/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCubeQuad(scene) {
	CGFobject.call(this,scene);
	this.quad = new MyQuad(this.scene);
	this.quad.initBuffers();
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function () {
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.5);
	this.quad.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.translate(0,0,-0.5);
	this.quad.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.rotate(-90*Math.PI/180.0,1,0,0);
	this.scene.translate(0,0,0.5);
	this.quad.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.rotate(-90*Math.PI/180.0,1,0,0);
	this.scene.translate(0,0,-0.5);
	this.quad.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.translate(-0.5,0,0);
	this.scene.rotate(-90*Math.PI/180.0,0,1,0);
	this.quad.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.translate(0.5,0,0);
	this.scene.rotate(-90*Math.PI/180.0,0,1,0);
	this.quad.display();
};