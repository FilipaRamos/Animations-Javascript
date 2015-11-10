function Animation(scene, id, type, time, currentTime){

 	CGFappearance.call(this,scene);

 	this.id = id;
 	this.type = type;
    this.time = time;

    this.currentTime = currentTime;
}

Animation.prototype = Object.create(CGFappearance.prototype);

Animation.prototype.constructor = Animation;

Animation.prototype.update = function(type){
	type.update(this.currentTime);
}