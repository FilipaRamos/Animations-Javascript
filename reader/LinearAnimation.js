function LinearAnimation(scene, animation, crtlPoints){

 	CGFappearance.call(this,scene);

    this.animation = animation;
    this.crtlPoints = crtlPoints; //relative to animation's position 

    this.i = 0;

    this.milesimoS = 1/1000;

    // guardam os valores do declive e do b da reta em questão
    // quando a trajetória muda e se passa para outra reta estes são atualizados
    this.m;
    this.b;
   
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
LinearAnimation.prototype.calculaDeclive = function(x1, y1, x2, y2){

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

/*
* Calcula o y atual
* @constructor
*/
LinearAnimation.prototype.calculaY = function(x, m, b){

  var y = m*x + b;

  return y;

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

/*
* Cálculo dos pontos de passagem entre retas
* @constructor
*/
LinearAnimation.prototype.calculaPontosPassagem = function(){

  var pontos = [];
  var l = 0;

  // o primeiro ponto não é de controlo logo f = 3
  for(var f = 3; f < ctrlPoints.length; f+3){

    pontos[l] = ctrlPoints[f];
    pontos[l+1] = ctrlPoints[f+1];

    l++;

  }

  // array pontos = [x1, y1, x2, y2, ...]
  return pontos;

}

/*
* Verificação da chegada aos pontos de mudança de reta
* @constructor
*/
LinearAnimation.prototype.verificaPontosPassagem = function(pontos, incremento){

  // se o i for igual a ponto/incremento está no ponto de passagem
  // verificar o x logo passa-se de 2 em 2 elementos
  for(var k = 0; k < pontos.length; k+2){
    if(this.i == (Math.floor(pontos[k])/incremento))
      return k;
  }

  return -1;

}

/*
* Cálculo da equação da nova reta
* @constructor
*/
LinearAnimation.prototype.calculaReta = function(pontos, i, x){

  this.m = calculaDeclive(pontos[i], pontos[i+1], pontos[i+2], pontos[i+3]);

  this.b = calculaB(pontos[i], this.m, pontos[i+1]);

  var y = calculaY(x, this.m, this.b);

  return y;

}

/*
* Atualiza as coordenadas da animação
* @constructor
*/
LinearAnimation.prototype.update = function(currentTime){

  var incrX = calculaIncrementoX(this.animation.time);

  var x;
  // adicionar ao x o incremento !!!!!!!!!!!!!!!!!

  // cálculo dos pontos de passagem de reta
  var pontos = [];
  pontos = calculaPontosPassagem();

  // verificação dos pontos de passagem
  var k = verificaPontosPassagem(pontos);

  var y;

  if (k != -1){ // significa que estamos num ponto de passagem logo tem de ser calculada nova equação da reta
    y = calculaReta(k);
  }
  else{
    y = calculaY(x, this.m, this.b);
  }

  this.i++;

}