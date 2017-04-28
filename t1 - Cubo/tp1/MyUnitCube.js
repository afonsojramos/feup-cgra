/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            0.5, 0.5, 0.5,            
            0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,

            0.5, 0.5, -0.5,           
            0.5, -0.5, -0.5,            
            -0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,
            ];

	this.indices = [
            2, 3, 1,
			2, 1, 0, 
            0, 1, 2, 
			1, 3, 2,

			0, 2, 4, 
			4, 6, 2,
			4, 2, 0, 
			2, 6, 4,

			5, 4, 0, 
			5, 0, 1,
			0, 4, 5, 
			1, 0, 5,

			6, 7, 4, 
			4, 7, 5,
			4, 7, 6, 
			5, 7, 4,

			3, 6, 2, 
			7, 6, 3,
			2, 6, 3, 
			3, 6, 7,

			5, 7, 3, 
			3, 1, 5,
			3, 7, 5, 
			5, 1, 3,
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};