var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var FREQ = 10;
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
	this.Light5 = true;
	this.clockON = true;

	
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
	this.bottom = new Plane(this, 16, 20, 40, 20, 40);

	this.prism = new MyPrism(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.lamp = new MyLamp(this, 10, 20);
	this.clock = new MyClock(this);
	this.plane = new MyPaperPlane(this);
	this.submarine = new MySubmarine(this, INITIALX, INITIALY, INITIALZ);
	this.cylinderb = new MyCylinderWBases(this, 8);
	this.targets = [this.target1 = new MyTarget(this,5,5,5), this.target2 = new MyTarget(this,5,5,0)];

	this.boardA = new Plane(this, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, 0, 1, 0, 1);

	// Materials
	this.submarineAppearances = {};

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

	this.subMaterial1 = new CGFappearance(this);
	this.subMaterial1.setAmbient(1, 1, 1, 1);
	this.subMaterial1.setDiffuse(1, 1, 1, 1);
	this.subMaterial1.setSpecular(1, 1, 1, 1);
	this.subMaterial1.loadTexture("../resources/images/Plate.png");

	this.subMaterial2 = new CGFappearance(this);
	this.subMaterial2.setAmbient(1, 1, 1, 1);
	this.subMaterial2.setDiffuse(1, 1, 1, 1);
	this.subMaterial2.setSpecular(1, 1, 1, 1);
	this.subMaterial2.loadTexture("../resources/images/angola.png");

	this.subMaterial3 = new CGFappearance(this);
	this.subMaterial3.setAmbient(1, 1, 1, 1);
	this.subMaterial3.setDiffuse(1, 1, 1, 1);
	this.subMaterial3.setSpecular(1, 1, 1, 1);
	this.subMaterial3.loadTexture("../resources/images/gold.jpg");

	this.subMaterial4 = new CGFappearance(this);
	this.subMaterial4.setAmbient(1, 1, 1, 1);
	this.subMaterial4.setDiffuse(1, 1, 1, 1);
	this.subMaterial4.setSpecular(1, 1, 1, 1);
	this.subMaterial4.loadTexture("../resources/images/camo.jpg");

	this.submarineAppearances = [this.subMaterial1, this.subMaterial2, this.subMaterial3, this.pillarAppearance, this.subMaterial4];
	this.submarineAppearanceList = {
		'Metal': 0,
		'Angola': 1,
		'Gold': 2,
		'Concrete': 3,
		'Camo': 4
	};
	this.SubmarineTexture = 'Metal';
	this.currSubmarineAppearance = this.submarineAppearanceList[this.SubmarineTexture];
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


	this.setUpdatePeriod(FREQ);
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

	// ---- BEGIN Primitive drawing section
	// Cylinder
	this.pushMatrix();
	this.rotate(90 * degToRad, 1, 0, 0);
	this.translate(8, -0.1, -6);
	this.scale(0.1, 0.1, 6);
	this.pillarAppearance.apply();
	this.cylinderb.display();
	this.popMatrix();

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
	this.translate(0, 1, 0);
	this.translate(this.submarine.x, this.submarine.y, this.submarine.z);
	this.rotate(this.submarine.angle, 0, 1, 0);
	this.submarineAppearances[this.currSubmarineAppearance].apply();
	this.submarine.display();
	this.popMatrix();

	for(var count = 0 ; count < this.targets.length ; count++){
		this.targets[count].display();
	}

	// ---- END Primitive drawing section
};

LightingScene.prototype.Clock = function () {

	if (this.clockON == true)
		this.clockON = false;
	else
		this.clockON = true;
};

LightingScene.prototype.update = function (currentTime) {
	
	
	
	/*this.lastTime = this.lastTime | 0;
	this.diffTime = currentTime - this.lastTime;
	this.lastTime = currentTime;*/
	//Makes the Clock operate independently from the Plane by updating only once per second
	CLOCKRATE = CLOCKRATE + FREQ;
	if (CLOCKRATE == 600) {
		if (this.clockON)
			this.clock.update(currentTime);
		CLOCKRATE = 0;
	}

	this.currSubmarineAppearance = this.submarineAppearanceList[this.SubmarineTexture];

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

	this.submarine.update(currentTime);
};

