function LinearAnimation(scene, id, time, ctrlPoints){

 	CGFappearance.call(this,scene);

    this.id = id;
    this.time = time;
    this.ctrlPoints = ctrlPoints; //relative to animation's position 

    this.i = 0;

    this.distance = [0];

    this.disT = 0;

    this.calculaDist();

    this.speed = this.disT / this.time;
   
}

LinearAnimation.prototype = Object.create(CGFappearance.prototype);

/*
* Calcula as distâncias entre os pontos de controlo e guarda-as no vetor this.distance
* @method
*/
LinearAnimation.prototype.calculaDist = function(){

  for (var i = 0; i < this.ctrlPoints.length-4; i = i+3){

    this.disT += vec3.distance(vec3.fromValues(this.ctrlPoints[i], this.ctrlPoints[i+1], this.ctrlPoints[i+2]), 
                              vec3.fromValues(this.ctrlPoints[i+3], this.ctrlPoints[i+4], this.ctrlPoints[i+5]));
    this.distance.push(this.disT);

  }

}

/*
* Atualiza as coordenadas da animação
* @method
*/
LinearAnimation.prototype.update = function(scene, currentTime){

  var time = currentTime / 1000;

  if (time > this.time)
    return;

  var disAtual = this.speed * currentTime;


  for (var k = 0; k < this.distance.length; k++){

    if (this.distance[k] >= disAtual)
      break;

  }

  k--;
  var progress;
  
  progress = disAtual / (this.distance[k+1]-this.distance[k]);

  var translation = vec3.fromValues(  (this.ctrlPoints[(k+1)*3  ]-  this.ctrlPoints[(k*3) ])*progress + this.ctrlPoints[(k*3)  ],
                                      (this.ctrlPoints[(k+1)*3+1]-this.ctrlPoints[(k*3+1) ])*progress + this.ctrlPoints[(k*3+1)],
                                      (this.ctrlPoints[(k+1)*3+2]-this.ctrlPoints[(k*3+2) ])*progress + this.ctrlPoints[(k*3+2)]);

  this.scene.translate(translation[0], translation[1], translation[2]);
  
}