/**
 * MyFin
 * @constructor
 */
 function MyFin(scene) {
 	CGFobject.call(this, scene);

 	this.cube = new MyUnitCubeQuad(this.scene);
    this.tri = new MyTriPrism(this.scene);
 };

 MyFin.prototype = Object.create(CGFobject.prototype);
 MyFin.prototype.constructor = MyFin;

 MyFin.prototype.display = function() {
 	this.scene.pushMatrix();
        this.scene.translate(0.5,0.1,0.5);
        this.scene.scale(1,0.2,1);
        this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.scale(1,0.2,1);
        this.scene.translate(1,0,0);
        this.tri.display();
    this.scene.popMatrix();
 }
