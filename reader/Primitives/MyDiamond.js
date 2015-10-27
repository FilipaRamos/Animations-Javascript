function MyDiamond(scene,slices) {
        CGFobject.call(this,scene);
        
        this.scene = scene;
        this.tri;
        this.slices = slices;
 };
 
 MyDiamond.prototype = Object.create(CGFobject.prototype);
 MyDiamond.prototype.constructor = MyDiamond;

 MyDiamond.prototype.display = function() {
       
       /*MyTriangle(scene, leftX, leftY, leftZ, rightX, rightY, rightZ, topX, topY, topZ)*/
       /*
       Angulo de rotacao atan(2)
       */
    
    /*
    Angulo de incrmento é 360/slices;
    coordenadas (icos(anginc),isen(anginc),0), ((i+1)cos(anginc),(i+1)sen(anginc),0), (0,1,0)
    */
    var ang = 360/this.slices;
    var anginc=(ang*Math.PI)/180;
    var i;
       
     this.tri = new MyTriangle(this.scene, 0.5,0,0, Math.cos(anginc),0,Math.sin(anginc), 0,1,0);

      for(i=0; i < this.slices; i++){
            
             this.scene.pushMatrix();
   
             this.scene.translate(-Math.cos(anginc/2), 0, -Math.sin(anginc/2));
             this.scene.rotate(anginc,0,1,0);
             //this.scene.translate(Math.cos(anginc/2),0, Math.sin(anginc/2));
             this.tri.display();
      }

      
        this.scene.popMatrix();


 };