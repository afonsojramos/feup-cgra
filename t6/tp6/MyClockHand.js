/**
 * MyClockHand
 * @param gl {WebGLRenderingContext, size}
 * @constructor
 */
function MyClockHand(scene, size) {
	CGFobject.call(this, scene);

	this.clockHand = new MyUnitCubeQuad(this.scene);

	this.angle = 0;
	this.size = size;
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;

MyClockHand.prototype.setAngle = function (ang) {
	this.angle = - ang * Math.PI / 180.0;
};

MyClockHand.prototype.display = function () {

	this.scene.pushMatrix();
		this.scene.translate(.5 * this.size * Math.cos(Math.PI / 2 + this.angle), .5 * this.size * Math.sin(Math.PI / 2 + this.angle), 0);
		this.scene.rotate(this.angle, 0, 0, 1);
		this.scene.scale(.05, this.size, .03);
		this.clockHand.display();
	this.scene.popMatrix();
};