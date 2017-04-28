/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {

 	var theta = (2*Math.PI/this.slices);
  	this.vertices = [];
  	this.indices = [];
  	this.normals = [];
  	this.texCoords = [];

	var indix = 0;
    var ang = 0;
    
    for(var j =0; j < this.stacks; j++) {
   		for(var i =0; i < this.slices; i++)	{
   			var height = (1/this.stacks);
   			this.vertices.push(Math.cos(ang),Math.sin(ang),j*height);
    		this.normals.push(Math.cos(ang),Math.sin(ang),0);
    		this.vertices.push(Math.cos(ang),Math.sin(ang),(j+1)*height);
    		this.normals.push(Math.cos(ang),Math.sin(ang),0);
    		
    		ang += theta;
    		
			this.vertices.push(Math.cos(ang),Math.sin(ang),j*height);
    		this.normals.push(Math.cos(ang),Math.sin(ang),0);
     	  	this.vertices.push(Math.cos(ang),Math.sin(ang),(j+1)*height);
      	 	this.normals.push(Math.cos(ang),Math.sin(ang),0);
    		
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
