/**
 * MyInterface
 * @constructor
 */


function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function (application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);

	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui

	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	// add a group of controls (and open/expand by defult)

	var group = this.gui.addFolder("Lights");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;

	group.add(this.scene, 'Light1');
	group.add(this.scene, 'Light2');
	group.add(this.scene, 'Light3');
	group.add(this.scene, 'Light4');
	group.add(this.scene, 'Light5');

	//Clock Button
	this.gui.add(this.scene, 'Clock');

	//Locked Camera
	this.gui.add(this.scene, 'Camera');

	this.gui.add(this.scene.submarine, 'speed', -5.0, 5.0);

    //select submarine appearances
	this.gui.add(this.scene, 'SubmarineTexture', ['Concrete', 'Angola', 'Gold', 'Metal', 'Camo']);


	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function (event) {
	
    var key = event.keyCode;
 

	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this, event);

	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars

	//turning to capital letter (if it is a letter)
	if(event.keyCode >= 90)
		key -= 32;
	
	
	switch (key) {
		case (65): //A
			{
				this.scene.submarine.rudderAngleLeft();
				this.scene.submarine.rotateSubLeft();
				this.scene.submarine.setPressed(true);
			}
			break;
		
		case (87): //W
		    this.scene.submarine.incSpeed();
			break;

		case (83): //S
		    this.scene.submarine.decSpeed();
			break;

		case (68): //D
			{
				this.scene.submarine.rudderAngleRight();
				this.scene.submarine.rotateSubRight();
				this.scene.submarine.setPressed(true);
			}
			break;

	    case (69): //E
			{
				this.scene.submarine.sternAngleUp();
				this.scene.submarine.emerge();
				this.scene.submarine.setPressed(true);
			}
	        break;

	    case (81): //Q
			{
				this.scene.submarine.sternAngleDown();
				this.scene.submarine.dive();
				this.scene.submarine.setPressed(true);
			}
	        break;
		case (80): //P
		    this.scene.submarine.activatePeriscope();
			break;
		case (76): //L
		    this.scene.submarine.deactivatePeriscope();
			break;
	    case (70): //F
			{
				this.scene.activateMissile();
			}
	        break;
			
	};

	var self = this;

	window.onkeyup = function (e) {
		self.scene.submarine.setPressed(false);
	}
};

