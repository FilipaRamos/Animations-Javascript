function LinearAnimation(scene, animation, crtlPoints, time, transMatrix){

 	CGFappearance.call(this,scene);

    this.time = time; //total time in sec
    this.animation = animation;
    this.crtlPoints = crtlPoints;
    this.transMatrix = transMatrix;
}

LinearAnimation.prototype = Object.create(CGFappearance.prototype);

LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.execute = function()
{

   
    
}