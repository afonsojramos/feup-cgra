var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var CLOCKRATE = 0;

var INITIALX = 0;
var INITIALY = 0;
var INITIALZ = 0;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function (application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.enableTextures(true);

	this.Light1 = true; this.Light2 = true;
	this.Light3 = true; this.Light4 = true;
	this.Light5 = true; this.Clock = true;
	this.speed = 1;	

	this.gl.clearColor(0.1953125, 0.14453125, 0.921875, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.rightwall = new Plane(this);
	this.leftWall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	this.bottom = new Plane(this,16,20,40,20,40);

	this.prism = new MyPrism(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.lamp = new MyLamp(this, 10, 20);
	this.clock = new MyClock(this);
	this.plane = new MyPaperPlane(this);
	this.submarine = new MySubmarine(this,INITIALX,INITIALY,INITIALZ);
	this.cylinderb = new MyCylinderWBases(this,8);

	this.boardA = new Plane(this, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, 0, 1, 0, 1);

	// Materials
	this.materialDefault = new CGFappearance(this);

	this.topMaterial = new CGFappearance(this);
	this.topMaterial.setAmbient(0.3, 0.3, 0.3, 1);
	this.topMaterial.setDiffuse(130 / 255.0, 82 / 255.0, 1 / 255.0, 1);
	this.topMaterial.setSpecular(0.1, 0.1, 0.1, 1);
	this.topMaterial.setShininess(40);
	this.topMaterial.loadTexture("../resources/images/table.png");

	this.legMaterial = new CGFappearance(this);
	this.legMaterial.setAmbient(0.5, 0.5, 0.5, 1);
	this.legMaterial.setDiffuse(0.1, 0.1, 0.1, 1);
	this.legMaterial.setSpecular(0.3, 0.3, 0.3, 1);
	this.legMaterial.setShininess(1000);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.floorAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
	this.floorAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.floorAppearance.setShininess(70);
	this.floorAppearance.loadTexture("../resources/images/floor.png");

	this.wallMaterial = new CGFappearance(this);
	this.wallMaterial.setAmbient(0.5, 0.5, 0, 1);
	this.wallMaterial.setDiffuse(1, 0, 0, 1);
	this.wallMaterial.setSpecular(0.34, 0.32, 0.17, 1);
	this.wallMaterial.setShininess(10);

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.windowAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
	this.windowAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.windowAppearance.setShininess(10);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setShininess(1);
	this.slidesAppearance.setAmbient(0.5, 0.5, 0.5, 1);
	this.slidesAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
	this.slidesAppearance.setSpecular(0.1, 0.1, 0.1, 1);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setShininess(1000);
	this.boardAppearance.setAmbient(0.5, 0.5, 0.5, 1);
	this.boardAppearance.setDiffuse(0.3, 0.3, 0.3, 1);
	this.boardAppearance.setSpecular(0.5, 0.5, 0.5, 1);
	this.boardAppearance.loadTexture("../resources/images/board.png");
	this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.pillarAppearance = new CGFappearance(this);
	this.pillarAppearance.setDiffuse(0.2, 0.2, 0.2, 1);
	this.pillarAppearance.setSpecular(0.5, 0.5, 0.5, 1);
	this.pillarAppearance.setShininess(50);
	this.pillarAppearance.loadTexture("../resources/images/concrete.png");

	this.planeMaterial = new CGFappearance(this);
	this.planeMaterial.setShininess(1);
	this.planeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
	this.planeMaterial.setDiffuse(0.1, 0.1, 0.1, 1);
	this.planeMaterial.setSpecular(0.1, 0.1, 0.1, 1);

	this.seaAppearance = new CGFappearance(this);
	this.seaAppearance.setAmbient(0.4375, 0.4375, 0.60, 1);
	this.seaAppearance.setDiffuse(0.4375, 0.4375, 0.60, 1);
	this.seaAppearance.setSpecular(0.4375, 0.4375, 0.60, 1);
	this.seaAppearance.setShininess(50);
	this.seaAppearance.loadTexture("../resources/images/see.png");

	this.seaAppearance2 = new CGFappearance(this);
	this.seaAppearance2.setAmbient(0.1953125, 0.14453125, 0.921875, 1);
	this.seaAppearance2.setDiffuse(0.1953125, 0.14453125, 0.921875, 1);
	this.seaAppearance2.setSpecular(0.1953125, 0.14453125, 0.921875, 1);
	this.seaAppearance2.setShininess(50);
	this.seaAppearance2.loadTexture("../resources/images/sea.png");
};

LightingScene.prototype.initCameras = function () {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function () {
    this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);

    // Positions for five lights
    this.lights[0].setPosition(4, 6, 1, 1);
    this.lights[0].setVisible(true); // show marker on light position (different from enabled)

    this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
    this.lights[1].setVisible(true); // show marker on light position (different from enabled)

    this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
    this.lights[2].setVisible(true); // show marker on light position (different from enabled)

    this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
    this.lights[3].setVisible(true); // show marker on light position (different from enabled)

    this.lights[4].setPosition(0, 7.0, 7.5, 1.0);
    this.lights[4].setVisible(true); // show marker on light position (different from enabled)

    this.lights[0].setAmbient(0, 0, 0, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setSpecular(1, 1, 0, 1);


    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);

    this.lights[2].setAmbient(0, 0, 0, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setSpecular(1, 1, 1, 1);
    this.lights[2].setConstantAttenuation(0);
    this.lights[2].setLinearAttenuation(1);
    this.lights[2].setQuadraticAttenuation(0);


    this.lights[3].setAmbient(0, 0, 0, 1);
    this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[3].setSpecular(1, 1, 0, 1);
    this.lights[3].setConstantAttenuation(0);
    this.lights[3].setLinearAttenuation(0);
    this.lights[3].setQuadraticAttenuation(0.2);


    this.lights[4].setAmbient(0, 0, 0, 1);
    this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[4].setQuadraticAttenuation(0.2);


    this.setUpdatePeriod(10);
};

LightingScene.prototype.updateLights = function () {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function () {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup


	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section
	/*
		// Floor
		this.pushMatrix();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(15, 15, 0.2);
			this.floorAppearance.apply();
			this.floor.display();
		this.popMatrix();
	
		// Left Wall
		this.pushMatrix();
			this.windowAppearance.apply();
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);
			this.leftWall.display();
		this.popMatrix();
	
		// Plane Wall
		this.pushMatrix();
			this.translate(7.5, 4, 0);
			this.scale(15, 8, 0.2);
			this.wallMaterial.apply();
			this.rightwall.display();
		this.popMatrix();
	
		// First Table
		this.pushMatrix();
			this.translate(5, 0, 8);
			this.topMaterial.apply();
			this.table.display();
		this.popMatrix();
	
		// Second Table
		this.pushMatrix();
			this.translate(12, 0, 8);
			this.topMaterial.apply();
			this.table.display();
		this.popMatrix();
	
		// Board A
		this.pushMatrix();
			this.translate(4, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.slidesAppearance.apply();
			this.boardA.display();
		this.popMatrix();
	
		// Board B
		this.pushMatrix();
			this.translate(10.5, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.boardAppearance.apply();
			this.boardB.display();
		this.popMatrix();
	
		// Prims
		this.pushMatrix();
			this.rotate(90 * degToRad,1,0,0);
			this.translate(1,1,-8);
			this.scale(1,1,8);
			this.pillarAppearance.apply();
			this.prism.display();
		this.popMatrix();
	*/
		// Cylinder
		this.pushMatrix();
			this.rotate(90 * degToRad,1,0,0);
			this.translate(8,-0.1,-6);
			this.scale(0.1,0.1,6);
			this.pillarAppearance.apply();
			this.cylinderb.display();
		this.popMatrix();

		// Cylinder Bases

	/*
		//Lamp
		this.pushMatrix();
			this.translate(0, 8.0, 7.5);
			this.rotate(Math.PI/2,1,0,0);
			this.scale(0.5,0.5,0.5);
			this.lamp.display();
		this.popMatrix();
	
		//Plane
		this.pushMatrix();
			this.planeMaterial.apply();
			this.translate(this.plane.distance, this.plane.height, 8);
			this.rotate(this.plane.angle,0,0,1);
			this.plane.display();
		this.popMatrix();
	*/

	// Seabottom
	this.pushMatrix();
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(50, 50, 0.2);
		this.seaAppearance.apply();
		this.bottom.display();
	this.popMatrix();

	//Clock
	this.pushMatrix();
		this.translate(8, 5, 0);
		this.scale(1, 1, 1);
		this.pillarAppearance.apply();
		this.clock.display();
	this.popMatrix();

	//Submarine 
	this.pushMatrix();
		this.translate(0,1,0);
		this.translate(this.submarine.getX(),this.submarine.getY(),this.submarine.getZ());
		this.rotate(this.submarine.getAngle(),0,1,0);
		this.submarine.display();
	this.popMatrix();
	
    // ---- END Primitive drawing section

	this.submarine.setSpeed(this.speed);
};

LightingScene.prototype.doSomething = function ()
{ 
	console.log("Doing something..."); 
};

LightingScene.prototype.moveSubForward = function(){	
	this.submarine.setX(this.submarine.getX() - this.speed*(Math.sin(-this.submarine.getAngle())/10));
	this.submarine.setZ(this.submarine.getZ() + this.speed*(Math.cos(-this.submarine.getAngle())/10));
};

LightingScene.prototype.moveSubBack = function(){
	this.submarine.setX(this.submarine.getX() + this.speed*(Math.sin(-this.submarine.getAngle())/10));
	this.submarine.setZ(this.submarine.getZ() - this.speed*(Math.cos(-this.submarine.getAngle())/10));
};

LightingScene.prototype.rotateSubLeft = function(){
	this.submarine.setAngle(this.submarine.getAngle() + this.speed*(Math.PI / 180));
};

LightingScene.prototype.rotateSubRight = function(){
	this.submarine.setAngle(this.submarine.getAngle() - this.speed*(Math.PI / 180));
};



LightingScene.prototype.update = function (currentTime) {
	//Makes the Clock operate independently from the Plane by updating only once per second
	CLOCKRATE = CLOCKRATE + 10;
	if (CLOCKRATE == 600) {
		if (this.Clock)
			this.clock.update(currentTime);
		CLOCKRATE = 0;
	}

	if (this.Light1)
	    this.lights[0].enable();
	else
	    this.lights[0].disable();

	if (this.Light2)
	    this.lights[1].enable();
	else
	    this.lights[1].disable();

	if (this.Light3)
	    this.lights[2].enable();
	else
	    this.lights[2].disable();

	if (this.Light4)
	    this.lights[3].enable();
	else
	    this.lights[3].disable();

	if (this.Light5)
	    this.lights[4].enable();
	else
	    this.lights[4].disable();

	this.plane.update();
};

