/**
 * MyTriPrism
 * @constructor
 */
function MyTriPrism(scene) {
    CGFobject.call(this, scene);

    this.quad = new MyQuad(this.scene);
    this.triangle = new MyTriangleRect(this.scene);
};

MyTriPrism.prototype = Object.create(CGFobject.prototype);
MyTriPrism.prototype.constructor = MyTriPrism;

MyTriPrism.prototype.display = function () {
    this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(0.5, 0.5, 0);
        this.quad.display();
 	this.scene.popMatrix();
    
    this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(-0.5, 0.5, 0);
        this.quad.display();
 	this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4,0,1,0);
        this.scene.translate(0, 0.5, 0.705);    
        this.scene.scale(1.4142135623730950488016887242097,1,1);
        this.quad.display();
 	this.scene.popMatrix();
};