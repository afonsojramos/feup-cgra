/**
 * MyTorpedo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTorpedo(scene, subX, subY, subZ) {
    CGFobject.call(this, scene);

    //variables to change in order to move

    this.x = subX;
    this.y = subY;
    this.z = subZ;
    this.speed = 1.00;
    this.t = 0;
    

    this.p1 = [];
    this.p2 = [];
    this.p3 = [];
    this.p4 = [];

    this.target;

    //angle of rotation around Y axis (starts in the direction of Z axis)
    this.angleY = 0;

    //angle of rotation around X axis (starts in the direction of Z axis)
    this.angleX = 0;

    this.cylinderb = new MyCylinderWBases(this.scene, 26);
    this.scircle = new MyLamp(this.scene, 26, 5);
    this.fin = new MyFin(this.scene);
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function () {
    //Main Body
    this.scene.pushMatrix();
    this.scene.scale(0.3, 0.3, 2);
    this.scene.rotate(Math.PI / 2, 0, 0, -1);
    //this.scene.translate(this.x, this.y -5, this.z);
    this.cylinderb.display();
    this.scene.popMatrix();
    //Body Ends
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 2);
    this.scene.scale(0.3, 0.3, 0.3);
    this.scene.rotate(Math.PI, 0, 0, 1);
    //this.scene.translate(this.x, this.y -5, this.z);
    this.scircle.display();
    this.scene.popMatrix();
    //Body Ends
    this.scene.pushMatrix();
    this.scene.scale(0.3, 0.3, 0.3);
    this.scene.rotate(Math.PI, 1, 0, 0);
    //this.scene.translate(this.x, this.y -5, this.z);
    this.scircle.display();
    this.scene.popMatrix();
    //Fins
    this.scene.pushMatrix(); //Stern
    this.scene.translate(0, -0.09, 0);
    this.scene.scale(0.3, 0.9, 0.5);
    //this.scene.translate(this.x, this.y -5, this.z);
    this.fin.display();
    this.scene.popMatrix();

    this.scene.pushMatrix(); //Rudder
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.translate(0, -0.09, 0);
    this.scene.scale(0.3, 0.9, 0.5);
    //this.scene.translate(this.x, this.y -5, this.z);
    this.fin.display();
    this.scene.popMatrix();
};

MyTorpedo.prototype.bezier = function (time) {

    this.qx = Math.pow(1 - time, 3) * this.p1[0] + 3 * time * Math.pow(1 - time, 2) * this.p2[0] + 3 * Math.pow(time, 2) * (1 - time) * this.p3[0] + Math.pow(time, 3) * this.p4[0];
    this.qy = Math.pow(1 - time, 3) * this.p1[1] + 3 * time * Math.pow(1 - time, 2) * this.p2[1] + 3 * Math.pow(time, 2) * (1 - time) * this.p3[1] + Math.pow(time, 3) * this.p4[1];
    this.qz = Math.pow(1 - time, 3) * this.p1[2] + 3 * time * Math.pow(1 - time, 2) * this.p2[2] + 3 * Math.pow(time, 2) * (1 - time) * this.p3[2] + Math.pow(time, 3) * this.p4[2];
    this.qb = [];
    this.qb.push(this.qx, this.qy, this.qz);
    return this.qb;
}

MyTorpedo.prototype.setPoints = function () {
    this.p1 = [this.x, this.y, this.z];
    this.p2 = [this.x + 6 * Math.cos(this.angle + Math.PI / 2), this.y + 6 * Math.sin(this.vertAngle), this.z - 6 * Math.sin(this.angle + Math.PI / 2)];
    this.p3 = [this.target.x, this.target.y + 3, this.target.z];
    this.p4 = [this.target.x, this.target.y, this.target.z];
}

MyTorpedo.prototype.setTarget = function (target) {
    this.target = target;
}

MyTorpedo.prototype.update = function (delta) {

    var time = delta / 1000;
    var distance = Math.sqrt(Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2) + (Math.pow(this.target.z - this.z, 2)));
    
    
    var inc = time / distance;
    var qb = this.bezier(this.t);

    if (this.t < 1) {
        this.x = qb[0];
        this.y = qb[1];
        this.z = qb[2];
        
        this.t = this.t + inc;
    }

   // console.log(this.x);
    /*
    console.log(qb[0]);
    console.log(this.x);
    console.log("\n");
    console.log(this.y);
    console.log("\n");
    console.log(this.z);
    console.log("\n");*/
};