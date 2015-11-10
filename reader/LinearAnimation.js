function LinearAnimation(scene, animation, crtlPoints){

 	CGFappearance.call(this,scene);

    this.animation = animation;
    this.crtlPoints = crtlPoints; //relative to animation's position 
    this.aniTime = 0.001;

    this.i = 0;

    this.milesimoS = 1/1000;
   
}

LinearAnimation.prototype = Object.create(CGFappearance.prototype);

LinearAnimation.prototype.constructor = LinearAnimation;

/*
* y = mx + b
* Cálculo da equação da reta
*/

/*
* Calcula o declive da reta do trajeto
* @constructor
*/
LinearAnimation.prototype.calculaDeclive = function(x1, x2, y1, y2){

  var x = x2-x1;
  var y = y2-y1;

  var m = y/x;

  return m;

}

/*
* Calcula o b da reta do trajeto
* @constructor
*/
LinearAnimation.prototype.calculaB = function(x, m, y){

  var b = y - m*x;

  return b;

}

/**************************/


/*
* Calcula o valor que o x deve incrementar a cada milésimo de segundo
* Ix = (xT*(1/1000))/t
* @constructor
*/
LinearAnimation.prototype.calculaIncrementoX = function(t){

  // guarda a distância percorrida em x
  var xT = 0;

  // k incrementado 3 valores porque o vetor com os 
  // pontos de controlo tem o seguinte formato: [x1, y1, z1, x2, y2, z2, ...]
  for(var k = 0; k < ctrlPoints.length; k+3){

    xT += ctrlPoints[k];

  }

  var incremento = (xT*this.milesimoS)/t;

  return incremento;

}

LinearAnimation.prototype.update = function(currentTime){

  

}