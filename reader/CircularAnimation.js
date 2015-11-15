function CircularAnimation(scene, id, time, center, radius, startang, rotang){

 	CGFappearance.call(this,scene);

    this.id = id;
    this.time = time;
    this.center = center;
    this.radius = radius;
    this.startang = startang;
    this.rotang = rotang;

    this.milesimoS = 1/1000;

    // para guardar as coordenadas anteriores
    this.x = 0;
    this.z = 0;

}

CircularAnimation.prototype = Object.create(CGFappearance.prototype);

CircularAnimation.prototype.constructor = CircularAnimation;

/*
* Calcula o ângulo de incremento a cada milésimo de segundo a partir do ângulo de rotação e do tempo
* @constructor
*/
CircularAnimation.prototype.calculaIncremento = function(){

	var incremento = (milesimoS*this.rotang)/this.time;

	return incremento;

}

/*
* Update das coordenadas 
* @constructor
*/
CircularAnimation.prototype.update = function(currentTime, matrix){

	// representa o ângulo de incremento a cada milésimo de segundo
	var AngI = calculaIncremento();

	var x = this.radius*Math.cos(this.startang + AngI);

	var z = this.radius*Math.sin(this.startang + AngI);

    var trans_z = z - this.z;
    var trans_x = x - this.x;

    this.x = x;
    this.z = z;

    // update dos valores para serem adicionados à nova matrix
    var update = vec3.fromValues(trans_x, 0, trans_z);
    
    return update;

}
