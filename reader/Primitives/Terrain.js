function Terrain(scene, vertexURL, fragmentURL){

    this.testShaders = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");
    this.plane = new Plane(scene, 20);

    this.testShaders.setUniformsValues({hmap: 1});
    this.testShaders.setUniformsValues({colorMap: 2});

};

Terrain.prototype = Object.create(CGFobject.prototype);
Terrain.prototype.constructor = Terrain;

Terrain.prototype.display = function(){

    this.setActiveShader(this.testShaders);
    this.pushMatrix();
    this.plane.display();
    this.popMatrix();

    this.setActiveShader(this.defaultShader);

}