function MyVehicle(scene) {
    
    CGFobject.call(this, scene);
    
    this.controlVertex1 = [];
    this.controlVertex2 = [];
    this.controlVertex3 = [];


    this.controlVertex1.push([-2,0,2, 1], [-2,0,0, 1], [-2,0,-2, 1]);
    this.controlVertex1.push([0,1,2, 1], [0,1,0, 1], [0,1,-2, 1]);
    this.controlVertex1.push([2,0,2, 1], [2,0,0, 1], [2,0,-2, 1]);

    this.controlVertex2.push([-2,0,2, 1], [-2,0,2, 1], [-2,0,2, 1]);
    this.controlVertex2.push([0,-1,2, 1], [0,0,10, 1], [0, 1, 2, 1]);
    this.controlVertex2.push([2,0,2, 1], [2,0,2, 1], [2,0,2, 1]);

    this.controlVertex3.push([-2,0,2, 1], [-2,0,2, 1], [-2,0,2, 1]);
    this.controlVertex3.push([0,-1,2, 1], [0,0,2, 1], [0, 1, 2, 1]);
    this.controlVertex3.push([2,0,2, 1], [2,0,2, 1], [2,0,2, 1]);

    this.naveTop = new Patch(scene, 20, 20, 2, this.controlVertex1);
    this.naveFront = new Patch(scene, 20, 20, 2, this.controlVertex2);
    this.naveBack = new Patch(scene, 20, 20, 2, this.controlVertex3);

    
};

MyVehicle.prototype = Object.create(CGFobject.prototype);
MyVehicle.prototype.constructor = MyVehicle;

MyVehicle.prototype.display = function() 
{
   this.scene.scale(0.5,0.5,0.5);
   this.displayCreator();
};

MyVehicle.prototype.updateTextCoords = function(s,t){};

MyVehicle.prototype.displayCreator = function(){
     //Main body
    this.scene.pushMatrix();
    this.scene.scale(0.5,0.5,0.5);
    this.displayBody();
    this.scene.popMatrix();

    //Left side
    this.scene.pushMatrix();
    this.scene.scale(0.25,0.25,0.25);
    this.scene.translate(-8,0,0);
    this.displayBody();
    this.scene.popMatrix();

    //Right side
    this.scene.pushMatrix();
    this.scene.scale(0.25,0.25,0.25);
    this.scene.translate(8,0,0);
    this.displayBody();
    this.scene.popMatrix();

    //cabels
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2, 0,1,0);
    this.scene.scale(0.125,0.125,0.5);
    this.scene.translate(0,0,2);
    this.displayCabel();
    this.scene.popMatrix();

    //cabels
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2, 0,1,0);
    this.scene.scale(0.125,0.125,0.5);
    this.scene.translate(0,0,-2);
    this.displayCabel();
    this.scene.popMatrix();
}


MyVehicle.prototype.displayBody = function(){

    //Main air-plane
   
    this.naveTop.display();
    this.naveFront.display();
    this.scene.rotate(Math.PI, 0,0,1);
    this.naveTop.display();
    this.scene.rotate(Math.PI,0,1,0);
    this.naveBack.display();
}

MyVehicle.prototype.displayCabel = function(){

    //Main air-conecter
   
    this.naveTop.display();
    this.naveBack.display();
    this.scene.rotate(Math.PI, 0,0,1);
    this.naveTop.display();
    this.scene.rotate(Math.PI,0,1,0);
    this.naveBack.display();
}