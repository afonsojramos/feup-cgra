/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {

 	var theta = (2*Math.PI/this.slices);
  	this.vertices = [];
  	this.indices = [];
  	this.normals = [];
  	this.texCoords = [];
  	var indix = 0;
	
 	for(var j = 0; j < this.stacks; j++){
 		var angNorm = theta/2;
		for (var i = 0; i < this.slices; i++) {
			var height = (1/this.stacks);
			this.vertices.push(Math.cos(i*theta),Math.sin(i*theta),j*height);
			this.vertices.push(Math.cos(i*theta),Math.sin(i*theta),(j+1)*height);
			this.vertices.push(Math.cos((i+1)*theta),Math.sin((i+1)*theta),j*height);
			this.vertices.push(Math.cos((i+1)*theta),Math.sin((i+1)*theta),(j+1)*height);
			
			this.normals.push(Math.cos(angNorm), Math.sin(angNorm), 0);
			this.normals.push(Math.cos(angNorm), Math.sin(angNorm), 0);
			this.normals.push(Math.cos(angNorm), Math.sin(angNorm), 0);
			this.normals.push(Math.cos(angNorm), Math.sin(angNorm), 0);
			angNorm += theta;

			this.indices.push(indix+2,indix+1,indix);
    		this.indices.push(indix+1,indix+2,indix+3);
    		indix+=4;

			this.texCoords.push(i/this.slices, j/this.stacks);
			this.texCoords.push(i/this.slices, (j+1)/this.stacks);
			this.texCoords.push((i+1)/this.slices, j/this.stacks);
			this.texCoords.push((i+1)/this.slices, (j+1)/this.stacks);
 		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
