function Animation(scene, id, time){

 	CGFappearance.call(this,scene);

 	this.id = id;
    this.position = []; //animatino's position
    this.startAng;
    this.rotAng;
    this.time;
}

Animation.prototype = Object.create(CGFappearance.prototype);

Animation.prototype.constructor = Animation;