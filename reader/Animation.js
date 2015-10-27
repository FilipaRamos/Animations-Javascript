function Animation(scene, id, time, velocity){

 	CGFappearance.call(this,scene);

 	this.id = id;
    this.location = [];
    this.startAng;
    this.rotAng;
    this.time;
}

Animation.prototype = Object.create(CGFappearance.prototype);

Animation.prototype.constructor = Animation;