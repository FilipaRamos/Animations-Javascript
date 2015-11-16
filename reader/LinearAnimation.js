function LinearAnimation(scene, id, time, ctrlPoints){

 	CGFappearance.call(this,scene);

    this.id = id;
    this.time = time;
    this.ctrlPoints = ctrlPoints; //relative to animation's position 

    this.i = 0;

    this.milesimoS = 1/1000;

    // guardam os valores do declive e do b da reta em questão
    // quando a trajetória muda e se passa para outra reta estes são atualizados
    this.m;
    this.b;

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
LinearAnimation.prototype.calculaB = function(x, y){

  this.b = y - this.m*x;

}

/*
* Calcula o y atual
* @constructor
*/
LinearAnimation.prototype.calculaY = function(x){

  var y = this.m*x + this.b;

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
  var k = 0;
  // k incrementado 3 valores porque o vetor com os 
  // pontos de controlo tem o seguinte formato: [x1, y1, z1, x2, y2, z2, ...]
  for(k; k < this.ctrlPoints.length;k+3){

    xT += this.ctrlPoints[k];

  }

  console.log("ctrlPoints: " + this.ctrlPoints);
  console.log("incremento-> somaX =" + xT);

  var incremento = (xT*this.milesimoS)/this.time;

  return incremento;

}

/*
* Cálculo dos pontos de passagem entre retas
* @constructor
*/
LinearAnimation.prototype.calculaPontosPassagem = function(){

  var pontos = [];
  var l = 0;

  // o primeiro ponto pertence à primeira reta logo f = 3
  for(var f = 3; f < this.ctrlPoints.length; f+3){

    pontos[l] = this.ctrlPoints[f];
    pontos[l+1] = this.ctrlPoints[f+2];

    l+2;

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

  this.b = calculaB(pontos[i], pontos[i+1]);

  var y = calculaY(x);

  return y;

}

/*
* Atualiza as coordenadas da animação
* @constructor
*/
LinearAnimation.prototype.update = function(currentTime){
  console.log("entrou no update!");
  var incrX = this.calculaIncrementoX();
  console.log("incr " + incrX);
  var x;
  // adicionar ao x o incremento !!!!!!!!!!!!!!!!!
  this.x += incrX;

  console.log("X: " + incrX);

  // cálculo dos pontos de passagem de reta
  var pontos = [];
  pontos = this.calculaPontosPassagem();

  // verificação dos pontos de passagem
  var k = this.verificaPontosPassagem(pontos);

  var z = this.z;

  if(this.i == 0){ // primeiro declive

    this.m = calculaDeclive(this.ctrlPoints[0], this.ctrlPoints[2], this.ctrlPoints[3], this.ctrlPoints[5]);
    this.b = calculaB(this.ctrlPoints[3], this.ctrlPoints[5]);

    this.z = calculaY(x);

  }

  else{

    if (k != -1){ // significa que estamos num ponto de passagem logo tem de ser calculada nova equação da reta
      this.z = calculaReta(k);
    }
    else{
      this.z = calculaY(x);
    }
  }

  this.i++;

  // calcular o incremento realizado no z desde o último ponto até este
  var trans_z = this.z - z;

  // update dos valores para serem adicionados à nova matrix
  var update = vec3.fromValues(incrX, 0, trans_z);

  console.log(incrX);
  console.log(trans_z);

  return update;

}