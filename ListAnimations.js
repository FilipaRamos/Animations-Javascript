function ListAnimations(scene, animationsID){

 	this.animations = []; 
 	this.scene = scene;

 	for(var j = 0; j < this.scene.animations ; j++){
 	    for( var k = 0; k < this.animationsID ; k++){
 	        if(animations[K] == this.scene[j].id){
 	            this.animations.push(this.scene[j]);
 	        }
 	    }
 	    
 	}

 	this.somaTempo = [0];
 	var soma = 0;
    
    for(var i = 0; i < this.animations.length; i++){
         soma += this.animations[i].time;
        this.somaTempo.push(soma);
    }


}

ListAnimations.prototype.constructor = ListAnimations;

ListAnimations.prototype.getAnimationIndex = function(actTime){
    
    for(var i = 0; i < this.animations.length ; i++){
        if(actTime > this.animations[i].time){
            return i;
        }
    }
        
        return -1;                              
                                    
}

ListAnimations.prototype.update = function (currTime){

     var index = this.getAnimationIndex(currTime);

      var dec = this.somaTempo[index-1];
      
     this.scene.animations[index].update(currTime - dec);      


}