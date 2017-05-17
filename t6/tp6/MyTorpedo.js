/**
 * MyTorpedo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTorpedo(scene, x, y, z) {
    CGFobject.call(this, scene);

    //variables to change in order to move
    this.x = x;
    this.y = y;
    this.z = z;
    this.speed = 1.00;

    //angle of rotation around Y axis (starts in the direction of Z axis)
    this.angleY = 0;

    //angle of rotation around X axis (starts in the direction of Z axis)
    this.angleX = 0;

    this.cylinder = new MyCylinder(this.scene, 26, 20);
    this.cylinderb = new MyCylinderWBases(this.scene, 26);
    this.scircle = new MyLamp(this.scene, 26, 5);
    this.triangle = new MyTriangle(this.scene);
    this.fin = new MyFin(this.scene);
    this.helix = new MyHelix(this.scene);

};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function () {
    //Main Body
    this.scene.pushMatrix();
    this.scene.scale(0.3, 0.3, 2);
    this.scene.rotate(Math.PI/2, 0, 0, -1);
    this.cylinderb.display();
    this.scene.popMatrix();
    //Body Ends
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 2);
    this.scene.scale(0.3, 0.3, 0.3);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.scircle.display();
    this.scene.popMatrix();
    //Body Ends
    this.scene.pushMatrix();
    this.scene.scale(0.3, 0.3, 0.3);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.scircle.display();
    this.scene.popMatrix();
    //Fins
    this.scene.pushMatrix(); //Stern
    this.scene.translate(0, -0.09, 0);
    this.scene.scale(0.3, 0.9, 0.5);
    this.fin.display();
    this.scene.popMatrix();

    this.scene.pushMatrix(); //Rudder
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.translate(0, -0.09, 0);
    this.scene.scale(0.3, 0.9, 0.5);
    this.fin.display();
    this.scene.popMatrix();
};

MyTorpedo.prototype.update = function (currentTime) {

    this.delta = currentTime - this.startTime;
    this.delta = this.delta / 10;
    this.startTime = currentTime;

    this.hAngle += this.angInc * this.speed;
    this.helix.setAngle(this.hAngle);
    this.x = this.x - this.speed / this.delta * (Math.sin(-this.angleY) / 50);
    this.y = this.y + this.speed / this.delta * (Math.sin(-this.angleX) / 50);
    this.z = this.z + this.speed / this.delta * (Math.cos(-this.angleY) / 50);

    this.AngleReset();
    this.movePeriscope();
};