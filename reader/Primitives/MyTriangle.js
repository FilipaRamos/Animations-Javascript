/**
 * MyTriangle
 * @constructor
 * @param scene
 * @param letfX
 * @param leftY 
 * @param leftZ
 * @param rightX
 * @param rightY
 * @param rightZ
 * @param topX
 * @param topY
 * @param topZ
 */
 function MyTriangle(scene, leftX, leftY, leftZ, rightX, rightY, rightZ, topX, topY, topZ) {
        CGFobject.call(this,scene);
            
        this.leftX = leftX;
        this.leftY = leftY;
        this.leftZ = leftZ;
        this.rightX = rightX;
        this.rightY = rightY;
        this.rightZ = rightZ;
        this.topX = topX;
        this.topY = topY;
        this.topZ = topZ;
 
        this.initBuffers();
 };
 
 MyTriangle.prototype = Object.create(CGFobject.prototype);
 MyTriangle.prototype.constructor = MyTriangle;
 
/**
 * Method that draws the triangle
 * @constructor
 */
 MyTriangle.prototype.initBuffers = function() {
       
        this.vertices = [
        this.leftX,this.leftY,this.leftZ,
        this.rightX,this.rightY,this.rightZ,
        this.topX,this.topY,this.topZ,
        ];
 
        this.indices = [
        0, 1, 2,
        ];
 

       var vectorA = vec3.fromValues(this.rightX-this.leftX, this.rightY-this.leftY, this.rightZ-this.leftZ);
       var vectorB = vec3.fromValues(this.topX-this.leftX, this.topY-this.leftY, this.topZ-this.leftZ);
       var nor = vec3.create(); 
       var vec = vec3.cross(nor,vectorA, vectorB);
       vec3.normalize(nor,nor);

             
     this.texCoords = [
       0,0,
       1,0,
       1,1,
       ];
        
        
      this.normals = [
      nor[0], nor[1], nor[2],
      nor[0], nor[1], nor[2],
      nor[0], nor[1], nor[2],
      ];
      this.initGLBuffers();
 };

/**
* Method that updates the texture coordinates
* @constructor
*/  
MyTriangle.prototype.updateTextCoords = function(s,t){

    var a = Math.sqrt(Math.pow((this.topX-this.rightX),2) + Math.pow((this.topY-this.rightY),2) +  Math.pow((this.topZ-this.rightZ),2));
    var b = Math.sqrt(Math.pow((this.topX-this.leftX),2) + Math.pow((this.topY-this.leftY),2) +  Math.pow((this.topZ-this.leftZ),2));
    var c = Math.sqrt(Math.pow((this.leftX-this.rightX),2) + Math.pow((this.leftY-this.rightY),2) +  Math.pow((this.leftZ-this.rightZ),2));
         
    var alpha = Math.acos((-a*a+b*b+c*c)/(2*b*c));
    var beta = Math.acos((a*a-b*b+c*c)/(2*a*c));
    var omega = Math.acos((a*a+b*b-c*c)/(2*a*b));


    this.texCoords = [
	  0.0, 0.0,
	  c / s, 0.0,
	  (c - a * Math.cos(beta)) / s, a*Math.sin(beta)/t
    ];

    this.updateTexCoordsGLBuffers();
 };