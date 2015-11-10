function LinearAnimation(scene, animation, crtlPoints){

 	CGFappearance.call(this,scene);

    this.animation = animation;
    this.crtlPoints = crtlPoints; //relative to animation's position 
    this.aniTime = 0.001;
   
}

LinearAnimation.prototype = Object.create(CGFappearance.prototype);

LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.update = function(currentTime){

  var distancia_total;

  var update = 

}