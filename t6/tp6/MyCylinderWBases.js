/**
 * MyCylinderWBases
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyCylinderWBases(scene, sides) {
	CGFobject.call(this, scene);
	
	this.sides = sides;

	this.body = new MyCylinder(this.scene, this.sides, 20);
	this.base = new MyClockFace(this.scene, this.sides);

};

MyCylinderWBases.prototype = Object.create(CGFobject.prototype);
MyCylinderWBases.prototype.constructor = MyCylinderWBases;

MyCylinderWBases.prototype.display = function () {

    this.scene.pushMatrix();
		this.scene.translate(0, 0, 0);
		this.scene.rotate(Math.PI,0,1,0);
		this.base.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1);
		this.base.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0);
		this.body.display();
	this.scene.popMatrix();

};