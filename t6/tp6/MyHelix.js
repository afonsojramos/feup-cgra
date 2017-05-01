/**
 * MyHelix
 * @param gl {WebGLRenderingContext, size}
 * @constructor
 */
function MyHelix(scene, size) {
	CGFobject.call(this, scene);

	this.cube = new MyUnitCubeQuad(this.scene);

	this.angle = 0;
	this.size = size;
};

MyHelix.prototype = Object.create(CGFobject.prototype);
MyHelix.prototype.constructor = MyHelix;

MyHelix.prototype.setAngle = function (ang) {
	this.angle = ang;
};

MyHelix.prototype.display = function () {
	this.scene.pushMatrix();
        this.scene.translate(-1,-0.5,-1.8);
        this.scene.rotate(this.angle,0,0,1);
        this.scene.scale(0.2,0.6,0.1);
        this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(1,-0.5,-1.8);
        this.scene.rotate(-this.angle,0,0,1);
        this.scene.scale(0.2,0.6,0.1);
        this.cube.display();
    this.scene.popMatrix();
};