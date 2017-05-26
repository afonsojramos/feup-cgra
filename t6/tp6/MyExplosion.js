/**
 * MyExplosion
 * @constructor
 */
 function MyExplosion(scene, x,y,z) {
 	CGFobject.call(this,scene);

	this.X = x;
	this.Y = y;
	this.Z = z;
	
	this.expSemiSphere = new MyLamp(scene, 20,20);
	this.currExpScale = 0;
	this.expanding = true;

 	this.initBuffers();
 };

 MyExplosion.prototype = Object.create(CGFobject.prototype);
 MyExplosion.prototype.constructor = MyExplosion;

 MyExplosion.prototype.display = function() {
 	this.scene.translate(this.X, this.Y, this.Z);
	this.scene.scale(this.currExpScale, this.currExpScale, this.currExpScale);
	this.expSemiSphere.display();
	this.scene.rotate(Math.PI,0,1,0);
	this.expSemiSphere.display();
		this.currExpScale = this.currExpScale + (5 - this.currExpScale)/10;
		if (this.currExpScale > 4) {
			this.expanding = 0;
		}
};