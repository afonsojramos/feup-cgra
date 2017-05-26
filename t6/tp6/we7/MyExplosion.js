function MyExplosion(scene, target) {
    CGFobject.call(this, scene);

    this.x = target.x;
    this.y = target.y;
    this.z = target.z;
    this.size = target.size / 2;
    this.orisize = target.size;

    this.reverse = false;
    this.end = false;

    this.semis = new MyLamp(scene,20,10);
};

MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor = MyTarget;

MyExplosion.prototype.update = function(currTime){   
    if(this.reverse){
        this.size -= 0.11 * this.orisize * 2.5;
        if(this.size <= this.orisize / 2)
            this.end = true;
    }
    else {
        this.size += 2 * this.orisize;
        if(this.size >= 2 * this.orisize)
            this.reverse = true;
    }
};

MyExplosion.prototype.display = function(){
    //semis
    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);
    this.scene.scale(this.size, this.size, this.size);
    this.scene.rotate(90.0*degToRad,1,0,0);
    this.semis.display();
    this.scene.rotate(180.0*degToRad,1,0,0);
    this.semis.display();
    this.scene.popMatrix();
};


