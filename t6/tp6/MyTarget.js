/**
 * MyTarget
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTarget(scene, x, y, z) {
    CGFobject.call(this, scene);

    //variables to change in order to move
    this.x = x;
    this.y = y;
    this.z = z;
    this.speed = 1.00; 

    this.cube = new MyUnitCubeQuad(this.scene);
    this.cylinder = new MyCylinder(this.scene, 26, 20);
    this.cylinderb = new MyCylinderWBases(this.scene, 26);
    this.scircle = new MyLamp(this.scene,26,5);
    this.triangle = new MyTriangle(this.scene);
    this.fin = new MyFin(this.scene);
    this.helix = new MyHelix(this.scene);

};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function () {
    this.scene.pushMatrix(); //Top
        this.scene.translate(this.x,this.y,this.z);
        this.cube.display();
    this.scene.popMatrix();
};