function CircularAnimation(scene, animation, center, radious){

 	CGFappearance.call(this,scene);

    this.animation = animation;
    this.center = center;
    this.radious = radious;
}

CircularAnimation.prototype = Object.create(CGFappearance.prototype);

CircularAnimation.prototype.constructor = CircularAnimation;
