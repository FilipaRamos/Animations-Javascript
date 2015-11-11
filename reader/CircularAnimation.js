function CircularAnimation(scene, animation, center, radius, startang, rotang){

 	CGFappearance.call(this,scene);

    this.animation = animation;
    this.center = center;
    this.radius = radius;
    this.startang = startang;
    this.rotang = rotang;

    this.milesimoS = 1/1000;

}

CircularAnimation.prototype = Object.create(CGFappearance.prototype);

CircularAnimation.prototype.constructor = CircularAnimation;

/*
* Calcula o ângulo de incremento a cada milésimo de segundo a partir do ângulo de rotação e do tempo
* @constructor
*/
CircularAnimation.prototype.calculaIncremento = function(){

	var incremento = (milesimoS*this.rotang)/this.animation.time;

	return incremento;

}

/*
* Update das coordenadas 
* @constructor
*/
CircularAnimation.prototype.update = function(currentTime){

	// representa o ângulo de incremento a cada milésimo de segundo
	var AngI = calculaIncremento();

	// x = this.radius*Math.cos(this.startang + AngI);

	// y = this.radius*Math.sin(this.startang + AngI);


}
