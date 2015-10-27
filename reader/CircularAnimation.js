function CircularAnimation(scene, animation, center, radius){

 	CGFappearance.call(this,scene);

    this.animation = animation;
    this.center = center;
    this.radius = radius;
}

CircularAnimation.prototype = Object.create(CGFappearance.prototype);

CircularAnimation.prototype.constructor = CircularAnimation;
