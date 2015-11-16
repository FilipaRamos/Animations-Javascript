function LinearAnimation(scene, id, time, ctrlPoints){

 	CGFappearance.call(this,scene);

    this.id = id;
    this.time = time;
    this.ctrlPoints = ctrlPoints; //relative to animation's position 

    this.i = 0;

    this.milesimoS = 1/1000;

    // guardam os valores do declive e do b da reta em questão
    // quando a trajetória muda e se passa para outra reta estes são atualizados
    this.m = 0;
    this.b = 0;

    // values calculated before
    this.x = 0;
    this.z = 0;
   
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

  this.m = y/x;

}

/*
* Calcula o b da reta do trajeto
* @constructor
*/
LinearAnimation.prototype.calculaB = function(y){

  this.b = y - this.m*this.x;

}

/*
* Calcula o y atual
* @constructor
*/
LinearAnimation.prototype.calculaY = function(){

  var y = this.m*this.x + this.b;
  return y;

}

/**************************/


/*
* Calcula o valor que o x deve incrementar a cada milésimo de segundo
* Ix = (xT*(1/1000))/t
* @constructor
*/
LinearAnimation.prototype.calculaIncrementoX = function(){

  // guarda a distância percorrida em x
  var xT = 0;
  var k;
  // k incrementado 3 valores porque o vetor com os 
  // pontos de controlo tem o seguinte formato: [x1, y1, z1, x2, y2, z2, ...]
  for(k = 0; k < this.ctrlPoints.length; k = k+3){

    xT += this.ctrlPoints[k];

  }

  var incremento = (xT*this.milesimoS)/this.time;

  return incremento;

}

/*
* Cálculo dos pontos de passagem entre retas
* @constructor
*/
LinearAnimation.prototype.calculaPontosPassagem = function(){

  var pontos = [];

  // o primeiro ponto pertence à primeira reta logo f = 3
  for(var f = 3; f < this.ctrlPoints.length; f = f+3){

    pontos.push(this.ctrlPoints[f]);
    pontos.push(this.ctrlPoints[f+2]);

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
  for(var k = 0; k < pontos.length; k = k+2){
    if(this.i == (Math.floor(pontos[k])/incremento))
      return k;
  }

  return -1;

}

/*
* Cálculo da equação da nova reta
* @constructor
*/
LinearAnimation.prototype.calculaReta = function(pontos, i){

  this.m = this.calculaDeclive(pontos[i], pontos[i+1], pontos[i+2], pontos[i+3]);

  this.b = this.calculaB(pontos[i+1]);

  var y = this.calculaY();

  return y;

}

/*
* Atualiza as coordenadas da animação
* @constructor
*/
LinearAnimation.prototype.update = function(currentTime){

  var incrX = this.calculaIncrementoX();

  console.log(incrX);
  // adicionar ao x o incremento !!!!!!!!!!!!!!!!!
  this.x += incrX;

  console.log("X: " + this.x);

  // cálculo dos pontos de passagem de reta
  var pontos = [];
  pontos = this.calculaPontosPassagem();

  console.log("pontos: " + pontos);

  // verificação dos pontos de passagem
  var k = this.verificaPontosPassagem(pontos);

  var z = 0;
  console.log("Z inicial: " + z);
  console.log("this.z: " + this.z);
  z = this.z;

  if(this.i == 0){ // primeiro declive

    this.calculaDeclive(this.ctrlPoints[0], this.ctrlPoints[2], this.ctrlPoints[3], this.ctrlPoints[5]);
    this.calculaB(this.ctrlPoints[5]);

    this.z = this.calculaY();

  }

  else{

    if (k != -1){ // significa que estamos num ponto de passagem logo tem de ser calculada nova equação da reta
      this.z = this.calculaReta(pontos, k);
    }
    else{
      this.z = this.calculaY();
    }
  }

  this.i++;

  // calcular o incremento realizado no z desde o último ponto até este
  var trans_z = this.z - z;
  console.log("Z -> " + z);

  // update dos valores para serem adicionados à nova matrix
  var update = vec3.fromValues(incrX, 0, trans_z);

  return update;

}