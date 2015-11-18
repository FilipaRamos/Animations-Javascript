function ListAnimations(scene, animationsID){

 	this.animations = [] ; 
 	this.scene = scene;

 	for(var j = 0; j < this.scene.animations.length ; j++){
 	    for( var k = 0; k < animationsID.length ; k++){
 	        if( animationsID[k] === this.scene.animations[j].id){
 	            this.animations.push(this.scene.animations[j]);
 	        }
 	    }
 	    
 	}
 	

 	this.somaTempo = [0];
 	var soma = 0;
    
    for(var i = 0; i < this.animations.length; i++){
         soma += this.animations[i].time;
        this.somaTempo.push(soma);
    }

  this.index = -1;
  this.dec = 0;

}

ListAnimations.prototype.constructor = ListAnimations;

ListAnimations.prototype.getAnimationIndex = function(actTime){
    
    for(var i = 0; i < this.somaTempo.length ; i++){
        if(actTime > this.somaTempo[i]){
            return i;
        }
    }
        
        return -1;                              
                                    
}

ListAnimations.prototype.update = function (currTime){
      
    

     this.index = this.getAnimationIndex(currTime);

     if(this.index != -1 )
     this.dec = this.somaTempo[this.index-1];
     
     if(this.index != -1 && this.dec != undefined)
      this.animations[this.index].update(currTime - this.dec);      


}