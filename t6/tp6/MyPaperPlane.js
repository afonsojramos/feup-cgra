function MyPaperPlane(scene) {
	CGFobject.call(this,scene);

	this.stateMachine=0;
	this.distance=12;
	this.height=4;
	this.angle=0;

	this.initBuffers();
};

MyPaperPlane.prototype = Object.create(CGFobject.prototype);
MyPaperPlane.prototype.constructor=MyPaperPlane;

MyPaperPlane.prototype.update=function(){
	if(this.stateMachine==0){
		this.distance=this.distance-0.05;
		if(this.height<=8)
			this.height=this.height+0.009;
		this.angle=+this.angle;
	}

	if(this.stateMachine==1){
		this.distance=1;
		this.angle=Math.PI/2;
		if(this.height>2.5)	this.height=this.height-0.1;
		else 				this.height=1;
	}

	if(this.stateMachine==2){
		this.distance=0.5;
		this.angle=180*(Math.PI / 180);
		this.height=0.05
	}

	if(this.distance<2)
		this.stateMachine=1;

	if(this.height<=1)
		this.stateMachine=2;
}

MyPaperPlane.prototype.initBuffers = function () {


	this.vertices = [
            -2, 0, 0,
            0, 0.05, -0.5,
            0, 0, 0,
            0, 0.05, 0.5,
            0,-0.4, 0
			];

	this.indices = [
            2, 1, 0,
            0, 1, 2,
            2, 0, 3,
            3, 0, 2,
            0, 2, 4,
            4, 2, 0,	
        ];

	this.normals = [
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0,0,-1
	];

	this.texCoords = [
		0, 0,
		1,0.5,
		1,0,
		1,0.5,
		1,0.5,
	];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
