/**
 * MyTorpedo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTorpedo(scene) {
    CGFobject.call(this, scene);

    //variables to change in order to move

    this.x = scene.submarine.x;
    this.y = scene.submarine.y;
    this.z = scene.submarine.z;

    this.target = null;
    this.distance = 0.0;
    this.end = false;

    //angle of rotation around Y axis (starts in the direction of Z axis)
    this.angleY = scene.submarine.angleY;
    this.angleX = scene.submarine.angleX;
    
    this.y_offset = -1;
    this.z_offset = 1;

    this.cylinderb = new MyCylinderWBases(this.scene, 26);
    this.scircle = new MyLamp(this.scene, 26, 5);
    this.fin = new MyFin(this.scene);
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function () {
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.angleY, 0, 1, 0);
    this.scene.rotate(-this.angleX, 1, 0, 0);
    //Main Body
    this.scene.pushMatrix();
    this.scene.scale(0.3, 0.3, 2);
    this.scene.translate(0,0,-1);
    this.scene.rotate(Math.PI / 2, 0, 0, -1);
    this.cylinderb.display();
    this.scene.popMatrix();
    //Body Ends
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0);
    this.scene.scale(0.3, 0.3, 0.3);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.scircle.display();
    this.scene.popMatrix();
    //Body Ends
    this.scene.pushMatrix();
    this.scene.scale(0.3, 0.3, 0.3);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.scene.translate(0,0,6.6);
    this.scircle.display();
    this.scene.popMatrix();
    //Fins
    this.scene.pushMatrix(); //Stern
    this.scene.translate(0, -0.09, -2);
    this.scene.scale(0.3, 0.9, 0.5);
    this.fin.display();
    this.scene.popMatrix();

    this.scene.pushMatrix(); //Rudder
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.translate(0, -0.09, -2);
    this.scene.scale(0.3, 0.9, 0.5);
    this.fin.display();
    this.scene.popMatrix();
};

MyTorpedo.prototype.setPoints = function () {
    var x = this.x + 6 * Math.sin(this.angleY) / (Math.sqrt(1 + Math.pow(Math.sin(this.angleX), 2)));
    var y = this.y + 6 * Math.sin(this.angleX) / (Math.sqrt(1 + Math.pow(Math.sin(this.angleX), 2)));
    var z = this.z + 6 * Math.cos(this.angleY) / (Math.sqrt(1 + Math.pow(Math.sin(this.angleX), 2)));
    //console.log(x);
    return new MyPoint(x, y, z);
}

MyTorpedo.prototype.setTarget = function (target) {
    this.target = target;
    this.distance = Math.sqrt(Math.pow(target.x - this.x, 2) + Math.pow(target.y - this.y, 2) + Math.pow(target.z - this.z, 2));

    //Bezier
    this.p1 = new MyPoint(this.x, this.y, this.z);
    this.p2 = this.setPoints();
    this.p3 = new MyPoint(target.x, target.y + 3, target.z);
    this.p4 = new MyPoint(target.x, target.y, target.z);
    this.t = 0.0;
}

MyTorpedo.prototype.update = function (currentTime) {
    var delta = 0;
    if (this.lastTime != -1)
        delta = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    var incT = 0.1 / this.distance;
    this.t += incT;

    if (this.t >= 1.0) {
        target = null;
        this.end = true;
        this.t = 1;
    }

    var calc1 = Math.pow(1 - this.t, 3);
    var calc2 = 3 * this.t * (Math.pow(1 - this.t, 2));
    var calc3 = 3 * Math.pow(this.t, 2) * (1 - this.t);
    var calc4 = Math.pow(this.t, 3);

    var new_x = calc1 * this.p1.x + calc2 * this.p2.x + calc3 * this.p3.x + calc4 * this.p4.x;
    var new_y = calc1 * this.p1.y + calc2 * this.p2.y + calc3 * this.p3.y + calc4 * this.p4.y;
    var new_z = calc1 * this.p1.z + calc2 * this.p2.z + calc3 * this.p3.z + calc4 * this.p4.z;

    var dx = new_x - this.x;
    var dy = new_y - this.y;
    var dz = new_z - this.z;

    this.x = new_x;
    this.y = new_y;
    this.z = new_z;

    //console.log(this.p2.x);

    this.angleY = Math.atan(dx / dz) + (dz < 0 ? 180.0 * degToRad : 0);
    this.angleX = Math.atan(dy / Math.sqrt(dx * dx + dy * dy + dz * dz));

    this.y_offset = (1 - this.t) * -1.6;
    if (this.y_offset > 0)
        this.y_offset = 0;
    this.z_offset = (1 - this.t) * 1.5;
    if (this.z_offset < 0)
        this.z_offset = 0;
};