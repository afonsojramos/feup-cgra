/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MySubmarine(scene, x, y, z) {
    CGFobject.call(this, scene);

    this.startTime = 0;
    this.delta = 0;

    //variables to change in order to move
    this.x = x;
    this.y = y;
    this.z = z;
    this.speed = 0.00;

    //angle of rotation around Y axis (starts in the direction of Z axis)
    this.angleY = 0;

    //angle of rotation around X axis (starts in the direction of Z axis)
    this.angleX = 0;
    this.rudderAngle = 0;
    this.sternAngle = 0;

    this.periscopeHeight = 1;
    this.activePeriscope = true;

    this.hAngle = 0;
    this.angInc = Math.PI / 30;

    this.cylinder = new MyCylinder(this.scene, 26, 20);
    this.cylinderb = new MyCylinderWBases(this.scene, 26);
    this.scircle = new MyLamp(this.scene, 26, 5);
    this.triangle = new MyTriangle(this.scene);
    this.fin = new MyFin(this.scene);
    this.helix = new MyHelix(this.scene);

};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function () {
    //Main Body
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -2.04);
    this.scene.scale(0.73, 1, 4.08);
    this.cylinderb.display();
    this.scene.popMatrix();
    //Body Ends
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -2.04);
    this.scene.translate(0, 0, 4.08);
    this.scene.scale(0.73, 1, 0.46);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.scircle.display();
    this.scene.popMatrix();
    //Body Ends
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -2.04);
    this.scene.scale(0.73, 1, 0.46);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.scircle.display();
    this.scene.popMatrix();
    //Top
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.scale(0.60, 0.88, 1.57);
    this.cylinderb.display();
    this.scene.popMatrix();
    //Vertical Peeking Tube
    this.scene.pushMatrix();
    this.scene.translate(0,-1,0);
    this.scene.translate(0, this.periscopeHeight * 2.57, 0.4);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.scale(0.1, 0.1, 1);
    this.cylinderb.display();
    this.scene.popMatrix();
    //Horizontal Peeking Tube
    this.scene.pushMatrix();
    this.scene.translate(0, this.periscopeHeight * 2.57, 0.4);
    this.scene.rotate(-Math.PI / 2, 0, 0, 0);
    this.scene.scale(0.1, 0.1, 0.3);
    this.cylinderb.display();
    this.scene.popMatrix();
    //Semi Circle Covering Cylinder connection
    this.scene.pushMatrix();
    this.scene.translate(0, this.periscopeHeight * 2.57, 0.4);
    this.scene.rotate(-3 * Math.PI / 4, 1, 0, 0);
    this.scene.scale(0.1, 0.1, 0.1);
    this.scircle.display();
    this.scene.popMatrix();
    //Fins
    this.scene.pushMatrix(); //Stern
    this.scene.translate(0, 0, -1.8);
    this.scene.rotate(-this.sternAngle, 1, 0, 0);
    this.scene.translate(0, -0.1, -0.5);
    this.scene.scale(0.8, 1, 0.65);
    this.fin.display();
    this.scene.popMatrix();

    this.scene.pushMatrix(); //Rudder
    this.scene.translate(0, 0, -1.8);
    this.scene.rotate(this.rudderAngle, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.translate(0, -0.1, -0.5);
    this.scene.scale(1, 1, 0.65);
    this.fin.display();
    this.scene.popMatrix();

    this.scene.pushMatrix(); //Top
    this.scene.translate(0, 1.2, -0.25);
    this.scene.scale(0.7, 1, 0.5);
    this.fin.display();
    this.scene.popMatrix();

    //Helix Tube
    this.scene.pushMatrix();
    this.scene.translate(1, -0.5, -1.8);
    this.scene.scale(0.4, 0.4, 0.6);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-1, -0.5, -1.8);
    this.scene.scale(0.4, 0.4, 0.6);
    this.cylinder.display();
    this.scene.popMatrix();
    //Helix Covers
    this.scene.pushMatrix();
    this.scene.translate(-1, -0.5, -1.6);
    this.scene.scale(0.1, 0.1, 0.1);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.scircle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1, -0.5, -1.6);
    this.scene.scale(0.1, 0.1, 0.1);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.scircle.display();
    this.scene.popMatrix();
    //Helixes
    this.helix.display();
};

MySubmarine.prototype.rotateSubLeft = function () {
    this.angleY += this.speed / this.delta * (Math.PI / 180);
};

MySubmarine.prototype.rotateSubRight = function () {
    this.angleY -= this.speed / this.delta * (Math.PI / 180);
};

MySubmarine.prototype.emerge = function () {
    this.angleX += this.speed / this.delta * (Math.PI / 180);

    if (this.angleX < -45 * (Math.PI / 180))
        this.angleX = -45 * (Math.PI / 180);
    else if (this.angleX > 45 * (Math.PI / 180))
        this.angleX = 45 * (Math.PI / 180);
};

MySubmarine.prototype.dive = function () {
    this.angleX -= this.speed / this.delta * (Math.PI / 180);

    if (this.angleX < -45 * (Math.PI / 180))
        this.angleX = -45 * (Math.PI / 180);
    else if (this.angleX > 45 * (Math.PI / 180))
        this.angleX = 45 * (Math.PI / 180);
    
};

MySubmarine.prototype.rudderAngleRight = function () {
    if (this.rudderAngle < 45 * (Math.PI / 180))
        this.rudderAngle += 4 * (Math.PI / 180);
}

MySubmarine.prototype.rudderAngleLeft = function () {
    if (this.rudderAngle > -45 * (Math.PI / 180))
        this.rudderAngle -= 4 * (Math.PI / 180);
}

MySubmarine.prototype.sternAngleUp = function () {
    if (this.sternAngle < 45 * (Math.PI / 180))
        this.sternAngle += 4 * (Math.PI / 180);
}

MySubmarine.prototype.sternAngleDown = function () {
    if (this.sternAngle > -45 * (Math.PI / 180))
        this.sternAngle -= 4 * (Math.PI / 180);
}

MySubmarine.prototype.AngleReset = function () {
    if (this.keypressed == false) {
        if (this.rudderAngle > 0)
            this.rudderAngle -= 2 * (Math.PI / 180);
        else if (this.rudderAngle < 0)
            this.rudderAngle += 2 * (Math.PI / 180);
        if (this.sternAngle > 0)
            this.sternAngle -= 2 * (Math.PI / 180);
        else if (this.sternAngle < 0)
            this.sternAngle += 2 * (Math.PI / 180);
    }
}

MySubmarine.prototype.movePeriscope = function () {
    if (this.activePeriscope){
        if (this.periscopeHeight < 1)
            this.periscopeHeight += 0.01;
    }
    else {
        if (this.periscopeHeight > 0)
            this.periscopeHeight -= 0.01;
    }
}

MySubmarine.prototype.activatePeriscope = function () {
        this.activePeriscope = true;
}

MySubmarine.prototype.deactivatePeriscope = function () {
        this.activePeriscope = false;
}

MySubmarine.prototype.incSpeed = function () {
    if (this.speed < 5)
        this.speed += 0.1;
};

MySubmarine.prototype.decSpeed = function () {
    if (this.speed > -5)
        this.speed -= 0.1;
};

MySubmarine.prototype.setPressed = function (state) {
    this.keypressed = state;
};

MySubmarine.prototype.update = function (currentTime) {

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