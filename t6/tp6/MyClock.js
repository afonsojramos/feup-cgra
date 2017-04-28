/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClock(scene) {
	CGFobject.call(this, scene);

	this.body = new MyCylinder(this.scene, 12, 1);
	this.face = new MyClockFace(this.scene, 12);
	this.secondsPointer = new MyClockHand(this.scene, 0.9);
	this.minutesPointer = new MyClockHand(this.scene, 0.75);
	this.hoursPointer = new MyClockHand(this.scene, 0.6);
	this.midPoint = new MyUnitCubeQuad(this.scene);

	this.hoursPointer.setAngle(90);
	this.minutesPointer.setAngle(180)
	this.secondsPointer.setAngle(270);

	// Materials
	this.handMaterial = new CGFappearance(this.scene);
	this.handMaterial.setAmbient(0.000001, 0.000001, 0.000001, 1);
	this.handMaterial.setDiffuse(0.000001, 0.000001, 0.000001, 1);
	this.handMaterial.setSpecular(0.000001, 0.000001, 0.000001, 1);

	this.secMaterial = new CGFappearance(this.scene);
	this.secMaterial.setAmbient(1, 0.000001, 0.000001, 1);
	this.secMaterial.setDiffuse(1, 0.000001, 0.000001, 1);
	this.secMaterial.setSpecular(1, 0.000001, 0.000001, 1);

	this.clockAppearance = new CGFappearance(this.scene);
	this.clockAppearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.clockAppearance.setDiffuse(0.6, 0.6, 0.6, 1);
	this.clockAppearance.setSpecular(0.1, 0.1, 0.1, 1);
	this.clockAppearance.setShininess(5);
	this.clockAppearance.loadTexture("../resources/images/clock.png");
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function () {

	//Clock body	
	this.scene.pushMatrix();
		this.scene.scale(1, 1, 0.3);
		this.body.display();
	this.scene.popMatrix();

	//Clock face

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.3);
		this.clockAppearance.apply();
		this.face.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0);
		this.scene.rotate(Math.PI,0,1,0);
		this.handMaterial.apply();
		this.face.display();
	this.scene.popMatrix();

	//Clock Mid Point
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.33);
		this.scene.scale(0.1,0.1,0.15);
		this.handMaterial.apply();
 		this.midPoint.display();
	this.scene.popMatrix();

	//Clock hands
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.33);
		this.secMaterial.apply();
		this.secondsPointer.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.36);
		this.handMaterial.apply();
		this.minutesPointer.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.39);
		this.handMaterial.apply();
		this.hoursPointer.display();
	this.scene.popMatrix();
};

MyClock.prototype.update = function (currentTime) {
	var time = currentTime / 1000;
	var sec = time % 60;
	var min = (time / 60) % 60;
	var hour = (time / 3600) % 12;

	this.secondsPointer.setAngle(sec * 6);
	this.minutesPointer.setAngle(min * 6);
	this.hoursPointer.setAngle(hour * 30 + 30); //+30 because of SummerTime
};