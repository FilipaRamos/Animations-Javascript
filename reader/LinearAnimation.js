function LinearAnimation(scene, animation, crtlPoints, time){

 	CGFappearance.call(this,scene);

    this.time = time; //total time in sec
    this.animation = animation;
    this.crtlPoints = crtlPoints; //relative to animation's position 
   
}

LinearAnimation.prototype = Object.create(CGFappearance.prototype);

LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.execute = function(){
    var vecCtrlPA = vec3.create();
    var vecCtrlPB = vec3.create();
    var vecDistancia = vec3.create();

    for(ver i = 0; i < this.crtlPoints.length; i++){
        
          vecCtrlPA = this.crtlPoints[i];
          vecCtrlPB = this.crtlPoints[i+1];
          vecDistancia = vec3.distance(vecCtrlPA, vecCtrlPB);
          
    }  
}